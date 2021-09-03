<template>
  <div class="register-box">
    <div class="register-container">
      <div class="register-title">Register</div>
      <div class="register-form">
        <el-form :model="registerForm" ref="registerForm" label-width="140px" size="medium">
          <el-form-item
            label="Workplace"
            prop="workplace"
            :rules="[
                  { required: true, message: 'Please select the workplace', trigger: 'blur' }
                ]"
          >
            <el-select
              v-model="registerForm.workplace"
              style="width: 100%"
              placeholder=" "
            >
              <el-option label="Academic" value="Academic"></el-option>
              <el-option label="Commercial/Industrial" value="Commercial/Industrial"></el-option>
              <el-option label="Government" value="Government"></el-option>
              <el-option label="Private Institution" value="Private Institution"></el-option>
              <el-option label="Other" value="Other"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            label="Job Type"
            prop="jobType"
            :rules="[
                  { required: true, message: 'Please select the job type', trigger: 'blur' }
                ]"
          >
            <el-select
              v-model="registerForm.jobType"
              style="width: 100%"
              placeholder=" "
            >
              <el-option label="Institute, Department or Faculty Head" value="Institute, Department or Faculty Head"></el-option>
              <el-option label="Senior Scientist or Principal Investigator" value="Senior Scientist or Principal Investigator"></el-option>
              <el-option label="Post Doctoral Researcher" value="Post Doctoral Researcher"></el-option>
              <el-option label="Graduate Student or Post Graduate" value="Graduate Student or Post Graduate"></el-option>
              <el-option label="Undergraduate Student" value="Undergraduate Student"></el-option>
              <el-option label="Technician or Assistant" value="Technician or Assistant"></el-option>
              <el-option label="University Lecturer" value="University Lecturer"></el-option>
              <el-option label="Manager" value="Manager"></el-option>
              <el-option label="Other" value="Other"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            label="Title"
            prop="title"
            :rules="[
                  { required: true, message: 'Please select the title', trigger: 'blur' }
                ]"
          >
            <el-select
              v-model="registerForm.title"
              style="width: 100%"
              placeholder=" "
            >
              <el-option label="Dr." value="Dr."></el-option>
              <el-option label="Mr." value="Mr."></el-option>
              <el-option label="Mrs." value="Mrs."></el-option>
              <el-option label="Ms." value="Ms."></el-option>
              <el-option label="Mx." value="Mx."></el-option>
              <el-option label="Prof." value="Prof."></el-option>
              <el-option label="Prof.Dr." value="Prof.Dr."></el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            label="First name"
            prop="firstName"
            :rules="{ required: true, message: 'Please input the first name', trigger: 'blur' }"
          >
            <el-input v-model="registerForm.firstName"></el-input>
          </el-form-item>
          <el-form-item
            label="Last name"
            prop="lastName"
            :rules="{ required: true, message: 'Please input the last name', trigger: 'blur' }"
          >
            <el-input v-model="registerForm.lastName"></el-input>
          </el-form-item>
          <el-form-item
            label="Facebook"
            prop="facebook"
          >
            <el-input v-model="registerForm.facebook"></el-input>
          </el-form-item>
          <el-form-item
            label="Twitter"
            prop="twitter"
          >
            <el-input v-model="registerForm.twitter"></el-input>
          </el-form-item>
          <el-form-item
            label="Affiliation"
            prop="affiliation"
            :rules="[
                  { required: true, message: 'Please input the affiliation', trigger: 'blur' }
                ]"
          >
            <el-input v-model="registerForm.affiliation"></el-input>
          </el-form-item>
          <el-form-item
            label="Address1"
            prop="address1"
            :rules="[
                  { required: true, message: 'Please input the address', trigger: 'blur' }
                ]"
          >
            <el-input v-model="registerForm.address1"></el-input>
          </el-form-item>
          <el-form-item
            label="Address2"
            prop="address2"
          >
            <el-input v-model="registerForm.address2"></el-input>
          </el-form-item>
          <el-form-item
            label="Zip Code"
            prop="zipCode"
            :rules="[
                  { required: true, message: 'Please input the zip code', trigger: 'blur' }
                ]"
          >
            <el-input v-model="registerForm.zipCode"></el-input>
          </el-form-item>
          <el-form-item
            label="City"
            prop="city"
            :rules="[
                  { required: true, message: 'Please input the city', trigger: 'blur' }
                ]"
          >
            <el-input v-model="registerForm.city"></el-input>
          </el-form-item>
          <el-form-item
            label="Country"
            prop="country"
            :rules="[
                  { required: true, message: 'Please select the country', trigger: 'blur' }
                ]"
          >
            <el-select
              v-model="registerForm.country"
              style="width: 100%"
              placeholder=" "
            >
              <el-option label="America" value="America"></el-option>
              <el-option label="China" value="China"></el-option>
              <el-option label="Japan" value="Japan"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            label="username"
            prop="username"
            :rules="[
                  { required: true, message: 'Please input the username', trigger: 'blur' }
                ]"
          >
            <el-input v-model="registerForm.username"></el-input>
          </el-form-item>
          <el-form-item
            label="email"
            prop="email"
            :rules="[
                  { required: true, message: 'Please input the email address', trigger: 'blur' },
                  { type: 'email', message: 'Please input the valid email address', trigger: ['blur', 'change'] }
                ]"
          >
            <el-input v-model="registerForm.email"></el-input>
          </el-form-item>
          <el-form-item
            label="Auth code"
            prop="authCode"
            :rules="[
                  { required: true, message: 'Please input the verification code', trigger: 'blur' }
                ]"
          >
            <el-input v-model="registerForm.authCode" :style="{width: authCodeWidth + '%'}"></el-input>
            <el-button @click="sendAuthCode" :disabled="sendState">{{sendText}}</el-button>
          </el-form-item>
          <el-form-item
            label="password"
            prop="password"
            :rules="[
                  { required: true, message: 'Please input the password', trigger: 'blur' }
                ]"
          >
            <el-input v-model="registerForm.password" show-password></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="register('registerForm')">Register</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Register',
  data () {
    return {
      authCodeWidth: 55,
      sendText: 'Send Auth Code',
      sendState: false,
      countDown: 60,
      timer: null,
      authCodeGet: null,
      registerForm: {
        username: '',
        email: '',
        authCode: '',
        password: '',
        workplace: '',
        jobType: '',
        title: '',
        firstName: '',
        lastName: '',
        facebook: '',
        twitter: '',
        affiliation: '',
        address1: '',
        address2: '',
        zipCode: '',
        country: ''
      }
    }
  },
  methods: {
    sendCountDown () {
      if (this.countDown > 0) {
        this.countDown--
        this.sendText = 'Resend after ' + this.countDown + ' seconds'
        this.timer = setTimeout(this.sendCountDown, 1000)
      } else {
        this.countDown = 0
        this.sendText = 'Send Auth Code'
        this.sendState = false
        clearTimeout(this.timer)
      }
    },
    sendAuthCode () {
      this.$axios({
        method: 'get',
        url: 'http://116.62.228.138:10003/users/authCode',
        params: {
          mailAddr: this.registerForm.email
        }
      })
        .then(res => {
          console.log(res.data)
          if (res.data.state === true) {
            this.$notify({
              title: 'Success',
              message: res.data.msg,
              type: 'success',
              offset: 100
            })
            this.$notify.info({
              title: 'Message',
              message: 'Sending interval is one minute',
              offset: 200
            })
            this.authCodeWidth = 38
            this.sendstate = true
            this.countDown = 60
            this.authCodeGet = res.data.data
            this.sendCountDown()
          } else {
            this.$notify.error({
              title: 'Error',
              message: res.data.msg,
              offset: 100
            })
          }
        })
    },
    register (formName) {
      this.$refs[formName].validate((valid) => {
        let obj = {
          workplace: this.registerForm.workplace,
          jobType: this.registerForm.jobType,
          title: this.registerForm.title,
          firstName: this.registerForm.firstName,
          lastName: this.registerForm.lastName,
          twitter: this.registerForm.twitter,
          facebook: this.registerForm.facebook,
          affiliation: this.registerForm.affiliation,
          address1: this.registerForm.address1,
          address2: this.registerForm.address2,
          zipCode: this.registerForm.zipCode,
          city: this.registerForm.city,
          country: this.registerForm.country,
          username: this.registerForm.username,
          email: this.registerForm.email,
          authCode: this.registerForm.authCode,
          password: this.registerForm.password
        }
        let jsonObj = JSON.stringify(obj)
        console.log(jsonObj)
        if (valid) {
          this.$axios({
            method: 'post',
            url: 'http://116.62.228.138:10003/users/register',
            headers:
            {
              'Content-Type': 'application/json;charset=UTF-8'
            },
            data: jsonObj
          })
            .then(res => {
              switch (res.data.state) {
                case true:
                  this.$notify({
                    title: 'Success',
                    message: 'Success to Register',
                    type: 'success',
                    offset: 100
                  })
                  window.location.href = 'http://localhost:8080/Login'
                  break
                case false:
                  this.$notify.error({
                    title: 'Error',
                    message: res.msg,
                    offset: 100
                  })
                  break
              }
            })
            .catch(err => {
              console.log(err)
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
.register-box {
  width: 100vw;
  height: 190vh;
  box-sizing: border-box;
}
.register-container {
  width: 40%;
  height: 70%;
  position: relative;
  top: 40%;
  left: 50%;
  transform: translate(-50%,-50%);
  background-color: #fff;
  border-radius: 20px;
  box-shadow: 0 0 3px #f0f0f0,
  0 0 6px #f0f0f0;
}
.register-title {
  padding-top: 50px;
  padding-bottom: 50px;
  font-size: 1.5em;
  font-weight: bold;
  color: rgb(57,167,176);
}
.register-form {
  width: 70%;
  height: 40%;
  padding-left: 10%;
  /*display: flex;*/
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}
</style>
