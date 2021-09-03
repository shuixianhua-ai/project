<template>
  <div style="padding-top: 40px; height: auto">
    <div class="header">
      <div class="collapse-btn" @click="collapseChange">
        <i v-if="!collapse" class="el-icon-s-fold"></i>
        <i v-else class="el-icon-s-unfold"></i>
        <span> &nbsp;&nbsp;&nbsp;&nbsp;Social Media</span>
      </div>
    </div>
    <div class="sidebar">
      <el-menu
        class="sidebar-el-menu"
        :default-active="$route.path"
        :collapse="collapse"
        background-color="#324157"
        text-color="#bfcbd9"
        active-text-color="#20a0ff"
        unique-opened
        router
        style="text-align: left; height: 1050px; border-right: none"
      >
        <el-menu-item index="/DataV">
          <i class="el-icon-pie-chart"></i>
          <span>Statistics Analysis</span>
        </el-menu-item>
        <el-menu-item index="/SocialMedia/Content">
          <i class="el-icon-view"></i>
          <span>Twitter Content</span>
        </el-menu-item>
        <el-menu-item index="/SocialMedia/List">
          <i class="el-icon-s-order"></i>
          <span>Disaster List</span>
        </el-menu-item>
        <el-menu-item index="/SocialMedia/Trend">
          <i class="el-icon-s-data"></i>
          <span>Trend Analysis</span>
        </el-menu-item>
        <el-menu-item index="/SocialMedia/Map">
          <i class="el-icon-map-location"></i>
          <span>Map Visualization</span>
        </el-menu-item>
      </el-menu>
    </div>
    <div class="content-box" :class="{ 'content-collapse': collapse }">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      collapse: false,
    };
  },
  methods: {
    collapseChange() {
      this.collapse = !this.collapse;
    },
  },
};
</script>

<style scoped>
.header {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 70px;
  font-size: 22px;
  background-color: white;
}
.collapse-btn {
  float: left;
  padding: 0 21px;
  cursor: pointer;
  line-height: 70px;
}
.sidebar {
  display: block;
  position: relative;
  left: 0;
  bottom: 0;
  overflow-y: scroll;
}
.sidebar::-webkit-scrollbar {
  width: 0;
}
.sidebar-el-menu:not(.el-menu--collapse) {
  width: 250px;
}
.sidebar > ul {
  height: 100%;
}
.content-box {
  position: absolute;
  left: 270px;
  right: 20px;
  top: 120px;
  bottom: 0;
  padding-bottom: 30px;
  -webkit-transition: left 0.3s ease-in-out;
  transition: left 0.3s ease-in-out;
  background: #353535;
  height: 1020px;
}

.content {
  width: auto;
  height: 100%;
  padding: 10px;
  overflow-y: scroll;
  box-sizing: border-box;
}

.content-collapse {
  left: 85px;
}
</style>
