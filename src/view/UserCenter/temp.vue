<template>
  <div>
    <el-container style="padding-top: 30px">
      <!-- width的宽度跟collapse一样动态控制 -->
      <el-aside width="collapse">
        <!-- :collapse="isCollapse"   class="el-menu-vertical" 动态控制导航菜单的收起与展开  router：让index作为 path 进行路由跳转 -->
        <el-menu
          :default-active="$route.path"
          router
          :collapse="isCollapse"
          class="el-menu-vertical"
          background-color="#393e42"
          text-color="#fff"
          active-text-color="rgb(64, 158, 255)"
          style="text-align: left"
        >
          <el-menu-item index="/UserCenter/Profile">
            <i class="el-icon-s-tools"></i>
            <span>Profile</span>
          </el-menu-item>
          <el-menu-item index="/UserCenter/ManagerPassword">
            <i class="el-icon-s-tools"></i>
            <span>Manager Password</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header>
          <div class="box_bgd" @click="isC">
            <!-- 点击展开收起导航和切换对应图标 -->
            <i class="el-icon-s-fold" v-show="block"></i>
            <i class="el-icon-s-unfold" v-show="toggle"></i>
          </div>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isCollapse: false,
      toggle: false,
      block: true
    }
  },
  methods: {
    isC () {
      this.isCollapse = !this.isCollapse
      this.toggle = !this.toggle
      this.block = !this.block
    }
  }
}
</script>

<style scoped>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
  height: 100%;
  padding: 0 !important;
}

.el-aside {
  background-color: #393e42;
  color: #333;
  height: 100vh;
}
.el-menu {
  border-right-width: 0;
}
.el-main {
  color: #333;
}
.el-menu-vertical:not(.el-menu--collapse) {
  width: 240px;
}
.box_bgd {
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  width: 54px;
}
.box_bgd i {
  font-size: 20px;
}
.box_bgd:hover {
  background-color: rgb(203, 215, 230);
}
</style>
