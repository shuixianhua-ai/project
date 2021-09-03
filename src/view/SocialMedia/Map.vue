<template>
  <div id="app">
    <mainmap></mainmap>
  </div>
</template>

<script>
import mainmap from "./mainmap";

export default {
  data() {
    return {};
  },
  components: {
    mainmap: mainmap,
  },
};
</script>

<style lang="less">
#app {
  font-family: Arial, "Avenir", Helvetica, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #353535;
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
