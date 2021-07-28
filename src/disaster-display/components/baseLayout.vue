<template>
  <div id="baseLayout">
    <el-container>
      <!-- <el-header>Header</el-header> -->
      <el-header style="padding: 0 20px">
        <headOfPage> </headOfPage>
      </el-header>
      <el-container>
        <el-aside width="400px">
          <el-tabs
            v-model="activeName1"
            type="border-card"
            @tab-click="handleClick"
          >
            <el-tab-pane label="Activation" name="Activation">
              <filterOfDisaster />
            </el-tab-pane>
            <el-tab-pane label="Acquisitions" name="Acquisitions">
              <filterOfPictures />
            </el-tab-pane>
            <el-tab-pane label="Products" name="Products">
              <productofPage />
            </el-tab-pane>
            <!-- <el-tab-pane label="功能4">功能4</el-tab-pane> -->
          </el-tabs>
        </el-aside>
        <el-container>
          <el-main>
            <!-- <div>aa</div> -->
            <mainmap></mainmap>
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
      activeName1: "Activation",
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

console.log("aaa     " + mainmap.flag);
</script>

<style>
html,
body,
#baseLayout {
  height: 100%;
}
.el-container {
  padding: 0px;
  margin: 0px;
  height: 100%;
}
.el-header {
  padding: 40px 70px;
}
.el-footer {
  background-color: #333;
  color: #333;
  text-align: center;
  height: 60px;
}

.el-aside {
  background-color: #333;
  color: #333;
  text-align: center;
  /* height: 600px; */
  overflow: auto;
}

.el-main {
  background-color: #333;
  color: #333;
  text-align: center;
  height: 100%;
  padding: 0px 20px;
  overflow: visible;
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
