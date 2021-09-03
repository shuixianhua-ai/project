<template>
  <div class="signIn-box">
    <div class="signIn-container">
      <div class="signIn-title">Sign In</div>
      <div class="signIn-form">
        <el-form :model="signInForm" ref="signInForm" label-width="100px" size="medium">
          <el-form-item
            label="Email"
            prop="email"
            :rules="[
                  { required: true, message: 'Please input the email address', trigger: 'blur' },
                  { type: 'email', message: 'Please input the valid email address', trigger: ['blur', 'change'] }
                ]"
          >
            <el-input v-model="signInForm.email"></el-input>
          </el-form-item>
          <el-form-item
            label="Password"
            prop="password"
            :rules="[
                  { required: true, message: 'Please input the password', trigger: 'blur' }
                ]"
          >
            <el-input v-model="signInForm.password" show-password></el-input>
          </el-form-item>
          <el-form-item>
            <el-checkbox v-model="checked" style="color:#a0a0a0;margin-right: 40px">Remember</el-checkbox>
            <router-link to="/ForgetPassword" style="color:#a0a0a0;text-decoration: none;">Forget Password</router-link>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="signIn('signInForm')" style="margin-right: 40px">Sign In</el-button>
            <router-link to="/Register"><el-button>Register</el-button></router-link>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <router-view></router-view>
  </div>

</template>

<script>
let storage = window.localStorage
export default {
  name: 'SignIn',
  data () {
    return {
      loginMode: true,
      checked: true,
      signInForm: {
        email: '',
        password: ''
      }
    }
  },
  mounted () {
    this.account()
  },
  methods: {
    account () {
      if (window.document.cookie.length >= 0) {
        console.log('Start Get')
        this.signInForm.email = this.getCookie('email')
        this.signInForm.password = this.getCookie('password')
        console.log(this.signInForm.email, this.signInForm.password)
      }
    },
    setCookie (email, password, exDay) {
      let currentDate = new Date()
      console.log(email, password)
      currentDate.setTime(currentDate.getTime() + 24 * 60 * 60 * 1000 * exDay)
      window.document.cookie = 'email=' + email + ';path=/;expires=' + currentDate.toUTCString()
      console.log('email=' + email + ';path=/;expires=' + currentDate.toUTCString())
      window.document.cookie = 'password=' + password + ';path=/;expires=' + currentDate.toUTCString()
    },
    getCookie (name) {
      let arr = window.document.cookie.split(';')
      console.log(arr)
      for (let i = 0; i < arr.length; i++) {
        let arr2 = arr[i].split('=')
        if (arr2[0].trim() === name) {
          return arr2[1]
        }
      }
    },
    clearCookie () {
      this.setCookie('', '', -1)
    },
    signIn (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios({
            method: 'get',
            url: 'http://116.62.228.138:10003/users/login',
            params: {
              mailAddr: this.signInForm.email,
              pwd: this.signInForm.password
            }
          })
            .then(res => {
              console.log(res)
              if (res.data.state === true) {
                storage['token'] = res.data.msg
                storage['id'] = res.data.data.uid
                storage['username'] = res.data.data.nickName
                storage['type'] = res.data.data.utype
                storage['email'] = res.data.data.mailAddr
                storage['workplace'] = res.data.data.workPlace
                storage['jobType'] = res.data.data.jobType
                storage['title'] = res.data.data.title
                storage['firstName'] = res.data.data.firstName
                storage['lastName'] = res.data.data.lastName
                storage['facebook'] = res.data.data.facebook
                storage['twitter'] = res.data.data.twitter
                storage['affiliation'] = res.data.data.affiliation
                storage['address1'] = res.data.data.address1
                storage['address2'] = res.data.data.address2
                storage['zipCode'] = res.data.data.zipCode
                storage['city'] = res.data.data.city
                storage['country'] = res.data.data.country
                if (this.checked === true) {
                  this.setCookie(this.signInForm.email, this.signInForm.password, 7)
                } else {
                  this.clearCookie()
                }
                this.$notify({
                  title: 'Success',
                  message: 'Login successfully',
                  type: 'success',
                  offset: 100
                })
                window.location.href = 'http://localhost:8080'
              } else {
                this.$notify.error({
                  title: 'Error',
                  message: res.data.msg,
                  offset: 100
                })
              }
            })
        } else {
          this.$notify({
            title: 'Warning',
            message: 'Please fill out the form completely',
            type: 'warning',
            offset: 100
          })
        }
      })
    }
  }
}
</script>

<style scoped>
.signIn-box {
  width: 100vw;
  height: 110vh;
  box-sizing: border-box;
}
.signIn-container {
  width: 30%;
  height: 40%;
  position: relative;
  top: 40%;
  left: 50%;
  transform: translate(-50%,-50%);
  background-color: #fff;
  border-radius: 20px;
  box-shadow: 0 0 3px #f0f0f0,
  0 0 6px #f0f0f0;
}
.signIn-title {
  padding-top: 50px;
  padding-bottom: 50px;
  font-size: 1.5em;
  font-weight: bold;
  color: rgb(57,167,176);
}
.signIn-form {
  width: 70%;
  height: 40%;
  padding-left: 10%;
  /*display: flex;*/
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}
.forget-password {
  padding-top: 35px;
  padding-right: 10px;
  text-align: right;
  font-family: Arial, Helvetica, sans-serif;
  text-decoration: none;
  font-size: 10px;
}
</style>
