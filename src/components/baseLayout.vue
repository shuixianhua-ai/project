<template>
  <div id="baseLayout">
    <el-container>
      <!-- <el-header>Header</el-header> -->
      <el-header>
        <headOfPage> </headOfPage>
      </el-header>
      <el-container>
        <el-aside width="400px">
          <el-tabs
            v-model="activeName1"
            type="border-card"
            @tab-click="handleClick"
          >
            <el-tab-pane label="Activation">
              <filterOfDisaster />
            </el-tab-pane>
            <el-tab-pane label="Acquisitions">
              <filterOfPictures />
            </el-tab-pane>
            <el-tab-pane label="Products">
              <productofPage />
            </el-tab-pane>
            <!-- <el-tab-pane label="功能4">功能4</el-tab-pane> -->
          </el-tabs>
        </el-aside>
        <el-container>
          <el-main>
            <mainmap> </mainmap>
          </el-main>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import mainmap from "./mainpage";
import headOfPage from "./Header";
import filterOfPictures from "./Filter";
import filterOfDisaster from "./FilterDisaster.vue";
import productofPage from "./Products";

import axios from "axios";

export default {
  name: "baseLayout",
  data() {
    return {
      activeName1: "first",
    };
  },
  methods: {
    handleClick(tab, event) {
      //console.log(tab, event);
    },
  },
  components: {
    mainmap: mainmap,
    headOfPage: headOfPage,
    filterOfPictures: filterOfPictures,
    filterOfDisaster: filterOfDisaster,
    productofPage: productofPage,
  },
};

// 前端读数据
// let url = "http://localhost:11000/disaster/disaster/get/?id=111";

// axios({
//   url: url,
//   method: "get",
// }).then((res) => {
//   console.log(res.data);
// });
</script>

<style>
html,
body,
#baseLayout,
.el-container {
  padding: 0px;
  margin: 0px;
  height: 100%;
}
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  height: 60px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  /* height: 600px; */
  overflow: auto;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  /* height: 600px; */
}
body > .el-container {
  margin-bottom: 40px;
}
.el-col {
  /* padding: 10px; */
  border-radius: 4px;
  /* line-height: 20px; */
}
.image {
  width: 100%;
  display: block;
}
</style>
