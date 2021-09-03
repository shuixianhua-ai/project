<template>
  <div style="padding-top: 40px; height: auto">
    <div class="header">
      <div class="collapse-btn" @click="collapseChange">
        <i v-if="!collapse" class="el-icon-s-fold"></i>
        <i v-else class="el-icon-s-unfold"></i>
        <span>Hello, {{ this.username }}!</span>
      </div>
      <div style="float: right;align-items: center;padding-top: 15px; padding-right: 3%" v-if="commonUser">
        <el-tooltip class="item" effect="dark" content="Request for permission to post an article" placement="bottom">
          <el-button type="primary" @click="requestPostAuth">Authentication</el-button>
        </el-tooltip>
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
          <i class="el-icon-user"></i>
          <span>Profile</span>
        </el-menu-item>
        <el-menu-item index="/UserCenter/ManagerPassword">
          <i class="el-icon-key"></i>
          <span>Manager Password</span>
        </el-menu-item>
        <el-menu-item index="/UserCenter/Audit" v-if="adminUser">
          <i class="el-icon-coordinate"></i>
          <span>Application Audit</span>
        </el-menu-item>
        <el-menu-item index="/UserCenter/DisasterTable" v-if="adminUser">
          <i class="el-icon-map-location"></i>
          <span>Disaster Audit</span>
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
      username: storage['username'],
      commonUser: false,
      adminUser: false,
      authUser: false
    }
  },
  methods: {
    collapseChange () {
      this.collapse = !this.collapse
    },
    requestPostAuth () {
      console.log(storage['token'])
      this.$axios({
        method: 'get',
        url: 'http://116.62.228.138:10003/users/authentication',
        headers: {
          'token': storage['token']
        },
        params: {
          mailAddr: storage['email']
        }
      })
        .then(res => {
          console.log(res)
          if (res.data.state === true) {
            this.$notify({
              title: 'Success',
              message: 'Waiting for approval',
              type: 'success',
              offset: 100
            })
          } else {
            this.$notify.error({
              title: 'Error',
              message: res.data.msg,
              offset: 100
            })
          }
        })
    }
  },
  mounted () {
    console.log(storage['type'])
    if (storage['type'] === '0') {
      this.commonUser = true
    } else if (storage['type'] === '1') {
      this.authUser = true
    } else if (storage['type'] === '2') {
      this.adminUser = true
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
