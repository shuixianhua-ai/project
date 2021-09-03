<template>
  <div>
    <div class="disaster-table">
      <el-table
        :data="disasterTable"
        style="width: 100%"
        max-height="700">
        <!-- <el-table-column
          fixed
          prop="did"
          label="ID"
          width="150">
        </el-table-column> -->
        <el-table-column
          prop="name"
          label="Name"
          width="150">
        </el-table-column>
        <el-table-column
          prop="country"
          label="Country"
          width="150">
        </el-table-column>
        <el-table-column
          prop="lon"
          label="Lon"
          width="120">
        </el-table-column>
        <el-table-column
          prop="lat"
          label="Lat"
          width="120">
        </el-table-column>
        <el-table-column
          prop="startTime"
          label="Start Time"
          width="200">
        </el-table-column>
        <el-table-column
          prop="description"
          label="Description"
          width="500">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="End Response"
          width="120">
          <template slot-scope="scope">
            <el-button
              @click.native.prevent="approve(scope.$index, disasterTable)"
              type="text"
              size="small">
              Stop
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      disasterTable: []
    }
  },
  mounted () {
    this.$axios({
      method: 'get',
      url: 'http://116.62.228.138:10003//disasterResponse/durableDisasterGet'
    })
      .then(res => {
        if (res.data.state === true) {
          console.log(res.data.data)
          this.disasterTable = res.data.data
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
      let obj = this.disasterTable[index]['did']
      console.log(obj)
      this.$axios({
        method: 'get',
        url: 'http://116.62.228.138:10003//disasterResponse/endResponse',
        params: {
          did: obj
        }
      })
        .then(res => {
          switch (res.data.state) {
            case true:
              this.$notify({
                title: 'Success',
                message: 'Success to Stop',
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

.disaster-table {
  padding-top: 40px;
  width: 90%;
  padding-left: 5%;
}
</style>
