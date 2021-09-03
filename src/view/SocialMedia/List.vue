<template>
  <div id="app">
    <el-row>
      <el-col :span="24">
      <template>
        <el-table
          :data="tableData"
          border
          style="width: 100%"
          @row-click="rowClick">
          <el-table-column
            prop="date"
            label="Date"
            width="180">
          </el-table-column>
          <el-table-column
            prop="name"
            label="Name"
            width="180">
          </el-table-column>
          <el-table-column
            prop="address"
            label="City">
          </el-table-column>
          <el-table-column
            prop="location"
            label="Location">
          </el-table-column>
        </el-table>
      </template>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [{
          date: '202107',
          name: 'Indonesia landslide',
          address: 'Indonesia',
          location:'20°N 120°E',
          index:'/DataV'
        }, {
          date: '202106-202107',
          name: 'California',
          address: 'No. 189, Grove St, Los Angeles',
          location:'20°N 120°E',
          index:'/DataV'
        }, {
          date: '202107',
          name: 'Indonesia landslide',
          address: 'Indonesia',
          location:'20°N 120°E',
          index:'/DataV'
        }, {
          date: '202106-202107',
          name: 'California',
          address: 'No. 189, Grove St, Los Angeles',
          location:'20°N 120°E',
          index:'/DataV'
        }]
      
    };
  },
  methods:{
    rowClick(row){
      console.log(row)
      if(row){
          let index = row.index;
          this.$router.push({ path:index  })
        }
    },
  }
};
</script>

<style lang="less">
#app {
  font-family: Arial, "Avenir", Helvetica, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color:  #353535;
  width: 100%;
  height: 100%;
  margin-top: 15px;
}

.el-row {
  margin-left: 20px;
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}

.text {
  font-size: 14px;
}

.mediaName {
  font-size: 16px;
  color: #000;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 90%;
}

.image {
  width: 100%;
  height: 100%;
}
</style>
