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
            <el-tab-pane label="功能1">
              <filterOfDisaster />
            </el-tab-pane>
            <el-tab-pane label="功能2">
              <filterOfPictures />
            </el-tab-pane>
            <el-tab-pane label="功能3">功能3</el-tab-pane>
            <el-tab-pane label="功能4">功能4</el-tab-pane>
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

export default {
  name: "baseLayout",
  data() {
    return {
      activeName1: "first",
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
  },
  components: {
    mainmap: mainmap,
    headOfPage: headOfPage,
    filterOfPictures: filterOfPictures,
    filterOfDisaster: filterOfDisaster,
  },
};
</script>

<style>
/* #baseLayout {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
} */
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
