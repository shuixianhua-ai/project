<template>
  <header :class="{headerSticky:header_fixed}">
    <a href="#" class="logo" :class="{logoSticky:header_fixed}">
      <img src="../../src/assets/pictures/logo_black.png" height="85px" width="auto" v-if="header_fixed">
      <img src="../../src/assets/pictures/logo_white.png" height="85px" width="auto" v-if="!header_fixed">
    </a>
    <a href="#" class="logo" :class="{logoSticky:header_fixed}">
      International disaster data and information service
    </a>
    <ul>
      <li>
        <router-link to="/" :class="{aSticky:header_fixed}">Home</router-link>
      </li>
      <li>
        <router-link to="/News" :class="{aSticky:header_fixed}">News</router-link>
      </li>
      <li>
        <router-link to="/SocialMedia" :class="{aSticky:header_fixed}">Social Media</router-link>
      </li>
      <li>
        <router-link to="/DisasterDisplay" :class="{aSticky:header_fixed}">Disaster Display</router-link>
      </li>
      <li>
        <router-link to="/Upload" :class="{aSticky:header_fixed}">Upload Data</router-link>
      </li>
      <li>
        <router-link to="/Weather" :class="{aSticky:header_fixed}">Weather</router-link>
      </li>
      <li>
        <router-link to="/UserCenter" :class="{aSticky:header_fixed}" v-if="isLogin">User Center</router-link>
        <router-link to="/Login" :class="{aSticky:header_fixed}" v-else>Sign In</router-link>
      </li>
      <li>
        <a :class="{aSticky:header_fixed}" v-if="isLogin" @click="signOut" style="cursor:pointer">Sign Out</a>
      </li>
    </ul>
  </header>
</template>

<script>
let storage = window.localStorage
export default {
  name: 'myHeader',
  data () {
    return {
      header_fixed: false,
      isLogin: false
    }
  },
  methods: {
    onScroll () {
      this.header_fixed = window.scrollY > 0
    },
    signOut () {
      console.log('Sign Out')
      this.$notify({
        title: 'Success',
        message: 'Sign Out Successfully',
        type: 'success',
        offset: 100
      })
      storage['token'] = undefined
      storage['isLogin'] = false
      storage['id'] = undefined
      storage['username'] = undefined
      storage['type'] = undefined
      storage['email'] = undefined
      storage['workplace'] = undefined
      storage['jobType'] = undefined
      storage['title'] = undefined
      storage['firstName'] = undefined
      storage['lastName'] = undefined
      storage['facebook'] = undefined
      storage['twitter'] = undefined
      storage['affiliation'] = undefined
      storage['address1'] = undefined
      storage['address2'] = undefined
      storage['zipCode'] = undefined
      storage['city'] = undefined
      storage['country'] = undefined
      window.location.href = 'http://localhost:8080'
    }
  },
  mounted () {
    console.log('header mounted')
    this.$nextTick(function () {
      window.addEventListener('scroll', this.onScroll)
    })
    if (storage['token'] === 'undefined') {
      storage['isLogin'] = false
    } else {
      this.$axios({
        method: 'get',
        url: 'http://116.62.228.138:10003/users/isLogin',
        headers: {
          'Content-Type': 'application/json',
          'token': storage['token']
        }
      })
        .then(res => {
          console.log(res)
          if (res.data.state === false) {
            storage['isLogin'] = false
          } else {
            storage['isLogin'] = true
            this.isLogin = true
          }
        })
    }
  }
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;
}

header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: 0.6s;
  padding: 20px 20px;
  z-index: 100000;
}

.headerSticky {
  padding: 5px 20px;
  background: #fff;
}

.logo {
  position: relative;
  font-weight: 700;
  color: #fff;
  text-decoration: none;
  font-size: 0.5em;
  text-transform: uppercase;
  letter-spacing: 2px;
  transition: 0.6s;
}

.logoSticky {
  color: #000;
}

header ul {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}

header ul li {
  position: relative;
  list-style: none;
}

header ul li a {
  position: relative;
  margin: 0 15px;
  text-decoration: none;
  color: #fff;
  letter-spacing: 2px;
  font-weight: 500;
  transition: 0.6s;
}

.aSticky {
  color: #000;
}
</style>
