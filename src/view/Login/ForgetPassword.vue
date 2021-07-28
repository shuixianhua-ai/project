<template>
  <div class="forgetPassword-box">
    <div class="forgetPassword-container">
      <div class="forgetPassword-title">Forget Password</div>
      <div class="forgetPassword-form">
        <el-form :model="forgetPasswordForm" ref="forgetPasswordForm" label-width="100px" size="medium">
          <el-form-item
            label="Email"
            prop="email"
            :rules="[
                  { required: true, message: 'Please input the email address', trigger: 'blur' },
                  { type: 'email', message: 'Please input the valid email address', trigger: ['blur', 'change'] }
                ]"
          >
            <el-input v-model="forgetPasswordForm.email"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="sendPassword('forgetPasswordForm')" style="margin-right: 40px">Send</el-button>
            <router-link to="/Login"><el-button>Back</el-button></router-link>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <router-view></router-view>
  </div>

</template>

<script>
export default {
  name: 'forgetPassword',
  data () {
    return {
      loginMode: true,
      forgetPasswordForm: {
        email: ''
      }
    }
  },
  methods: {
    sendPassword (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios({
            method: 'get',
            url: 'http://127.0.0.1:11000/users/forgetPassword',
            params: {
              mailAddr: this.forgetPasswordForm.email
            }
          })
            .then(res => {
              if (res.data.state === true) {
                this.$notify({
                  title: 'Success',
                  message: 'Success to Send',
                  type: 'success',
                  offset: 100
                })
                this.$notify.info({
                  title: 'Message',
                  message: 'Please Check Your Email',
                  offset: 200
                })
                window.location.href = 'http://localhost:8080/Login'
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
.forgetPassword-box {
  width: 100vw;
  height: 80vh;
  box-sizing: border-box;
}
.forgetPassword-container {
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
.forgetPassword-title {
  padding-top: 50px;
  padding-bottom: 50px;
  font-size: 1.5em;
  font-weight: bold;
  color: rgb(57,167,176);
}
.forgetPassword-form {
  width: 70%;
  height: 40%;
  padding-left: 10%;
  /*display: flex;*/
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}
</style>
