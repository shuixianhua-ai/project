<template>
  <div class="heading">
    <el-row>
      <el-col :span="20"
        ><h1 class="text">{{ msg }}</h1></el-col
      >
      <el-col :span="4">
        <el-button class="btn" type="primary" plain>LOG IN</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "headOfPage",
  data() {
    return {
      msg: "Disaster Response Information & Display",
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h2 {
  font-weight: normal;
}

.text {
  display: flex;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #ffffff;
  text-align: left;
  margin-top: 10px;
}

.btn {
  margin-top: 10px;
}

/* .btn {
} */
</style>
