<template>
  <div>
    <div class="application-table">
      <el-table
        :data="applicationTable"
        style="width: 100%"
        max-height="700">
        <el-table-column
          fixed
          prop="applyTime"
          label="Date"
          width="200">
        </el-table-column>
        <el-table-column
          prop="name"
          label="Name"
          width="200">
        </el-table-column>
        <el-table-column
          prop="mailAddr"
          label="Email"
          width="250">
        </el-table-column>
        <el-table-column
          prop="workPlace"
          label="Workplace"
          width="250">
        </el-table-column>
        <el-table-column
          prop="affiliation"
          label="Affiliation"
          width="200">
        </el-table-column>
        <el-table-column
          prop="title"
          label="Title"
          width="120">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="Operation"
          width="120">
          <template slot-scope="scope">
            <el-button
              @click.native.prevent="approve(scope.$index, applicationTable)"
              type="text"
              size="small">
              Approve
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
let storage = window.localStorage
export default {
  data () {
    return {
      applicationTable: []
    }
  },
  mounted () {
    this.$axios({
      method: 'get',
      url: 'http://116.62.228.138:10003/users/getApplicationData'
    })
      .then(res => {
        if (res.data.state === true) {
          this.applicationTable = res.data.data
        } else {
          this.$notify.error({
            title: 'Error',
            message: res.data.msg,
            offset: 100
          })
        }
      })
  },
  methods: {
    approve (index, rows) {
      let obj = this.applicationTable[index]['mailAddr']
      console.log(obj)
      this.$axios({
        method: 'get',
        url: 'http://116.62.228.138:10003/users/auditApplication',
        headers: {
          'token': storage['token']
        },
        params: {
          mailAddr: obj
        }
      })
        .then(res => {
          switch (res.data.state) {
            case true:
              this.$notify({
                title: 'Success',
                message: 'Success to Approve',
                type: 'success',
                offset: 100
              })
              rows.splice(index, 1)
              break
            case false:
              this.$notify.error({
                title: 'Error',
                message: res.data.msg,
                offset: 100
              })
              break
          }
        })
    }
  }
}
</script>

<style scoped>
h1, h2 {
  font-weight: normal;
}
a {
  color: #42b983;
}

.application-table {
  padding-top: 40px;
  width: 90%;
  padding-left: 5%;
}
</style>
