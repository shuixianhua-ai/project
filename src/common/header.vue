<template>
  <header :class="{headerSticky:header_fixed}">
    <a href="#" class="logo" :class="{logoSticky:header_fixed}">GIS</a>
    <ul>
      <li>
        <router-link to="/" :class="{aSticky:header_fixed}">Home</router-link>
      </li>
      <li>
        <router-link to="/Tinymce" :class="{aSticky:header_fixed}">About</router-link>
      </li>
      <li>
        <router-link to="/News" :class="{aSticky:header_fixed}">News</router-link>
      </li>
      <li>
        <router-link to="/Others" :class="{aSticky:header_fixed}">Contact</router-link>
      </li>
      <li>
        <router-link to="/UserCenter" :class="{aSticky:header_fixed}" v-if="isLogin">User Center</router-link>
        <router-link to="/Login" :class="{aSticky:header_fixed}" v-else>Sign In</router-link>
      </li>
      <li>
        <a :class="{aSticky:header_fixed}" v-if="isLogin" @click="signOut">Sign Out</a>
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
        url: 'http://127.0.0.1:11000/users/isLogin',
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
  padding: 40px 70px;
  z-index: 100000;
}
.headerSticky {
  padding: 5px 70px;
  background: #fff;
}
.logo {
  position: relative;
  font-weight: 700;
  color: #fff;
  text-decoration: none;
  font-size: 2em;
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
