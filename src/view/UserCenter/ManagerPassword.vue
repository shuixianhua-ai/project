<template>
  <div class="otherPage">
    <div class="changePassword-form">
      <el-form :model="changePasswordForm" ref="changePasswordForm" label-width="120px" size="medium">
        <el-form-item
          label="Old Password"
          prop="oldPassword"
          :rules="[
                  { required: true, message: 'Please input the old password', trigger: 'blur' }
                ]"
        >
          <el-input v-model="changePasswordForm.oldPassword" show-password></el-input>
        </el-form-item>
        <el-form-item
          label="New Password"
          prop="newPassword"
          :rules="[
                  { required: true, message: 'Please input the new password', trigger: 'blur' }
                ]"
        >
          <el-input v-model="changePasswordForm.newPassword" show-password></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="changePassword('changePasswordForm')">Change Password</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
let storage = window.localStorage
export default {
  data () {
    return {
      changePasswordForm: {
        oldPassword: '',
        newPassword: ''
      }
    }
  },
  methods: {
    changePassword (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios({
            method: 'get',
            url: 'http://116.62.228.138:10003/users/changePassword',
            params: {
              uid: storage['id'],
              oldPwd: this.changePasswordForm.oldPassword,
              newPwd: this.changePasswordForm.newPassword
            }
          })
            .then(res => {
              if (res.data.state === true) {
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
                this.$notify({
                  title: 'Success',
                  message: 'Success to Change Password',
                  type: 'success',
                  offset: 100
                })
                this.$notify.info({
                  title: 'Message',
                  message: 'Please log in again',
                  offset: 200
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
a {
  color: #42b983;
}
/*.otherPage {*/
/*  height: 700px;*/
/*  text-align: center;*/
/*}*/
.changePassword-form {
  padding-top: 10%;
  width: 40%;
  padding-left: 30%;
}
</style>
