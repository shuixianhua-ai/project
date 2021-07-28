<template>
  <div style="padding-top: 40px; height: auto">
    <div class="header">
      <div class="collapse-btn" @click="collapseChange">
        <i v-if="!collapse" class="el-icon-s-fold"></i>
        <i v-else class="el-icon-s-unfold"></i>
        <span>Hello, {{ this.username }}!</span>
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
        unique-opened router
        style="text-align: left; height: 1050px; border-right: none"
      >
        <el-menu-item index="/UserCenter/Profile">
          <i class="el-icon-s-tools"></i>
          <span>Profile</span>
        </el-menu-item>
        <el-menu-item index="/UserCenter/ManagerPassword">
          <i class="el-icon-s-tools"></i>
          <span>ManagerPassword</span>
        </el-menu-item>
      </el-menu>
    </div>
    <div class="content-box" :class="{ 'content-collapse': collapse }">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
let storage = window.localStorage
export default {
  data () {
    return {
      collapse: false,
      username: storage['username']
    }
  },
  methods: {
    collapseChange () {
      this.collapse = !this.collapse
    }
  }
}
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
  top: 190px;
  bottom: 0;
  padding-bottom: 30px;
  -webkit-transition: left .3s ease-in-out;
  transition: left .3s ease-in-out;
  background: #f0f0f0;
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
