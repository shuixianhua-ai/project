<template>
  <div class="otherPage">
    <div class="userInfo-form">
      <el-form :model="userInfoFrom" ref="userInfoFrom" label-width="140px" size="medium">
        <el-form-item
          label="Workplace"
          prop="workplace"
        >
          <el-select
            v-model="userInfoFrom.workplace"
            style="width: 100%"
            :placeholder="this.userInfoFrom.workplace"
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
        >
          <el-select
            v-model="userInfoFrom.jobType"
            style="width: 100%"
            :placeholder="this.userInfoFrom.jobType"
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
        >
          <el-select
            v-model="userInfoFrom.title"
            style="width: 100%"
            :placeholder="this.userInfoFrom.title"
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
        >
          <el-input v-model="userInfoFrom.firstName" :placeholder="this.userInfoFrom.firstName"></el-input>
        </el-form-item>
        <el-form-item
          label="Last name"
          prop="lastName"
        >
          <el-input v-model="userInfoFrom.lastName" :placeholder="this.userInfoFrom.lastName"></el-input>
        </el-form-item>
        <el-form-item
          label="Facebook"
          prop="facebook"
        >
          <el-input v-model="userInfoFrom.facebook" :placeholder="this.userInfoFrom.facebook"></el-input>
        </el-form-item>
        <el-form-item
          label="Twitter"
          prop="twitter"
        >
          <el-input v-model="userInfoFrom.twitter" :placeholder="this.userInfoFrom.twitter"></el-input>
        </el-form-item>
        <el-form-item
          label="Affiliation"
          prop="affiliation"
        >
          <el-input v-model="userInfoFrom.affiliation" :placeholder="this.userInfoFrom.affiliation"></el-input>
        </el-form-item>
        <el-form-item
          label="Address1"
          prop="address1"
        >
          <el-input v-model="userInfoFrom.address1" :placeholder="this.userInfoFrom.address1"></el-input>
        </el-form-item>
        <el-form-item
          label="Address2"
          prop="address2"
        >
          <el-input v-model="userInfoFrom.address2" :placeholder="this.userInfoFrom.address2"></el-input>
        </el-form-item>
        <el-form-item
          label="Zip Code"
          prop="zipCode"
        >
          <el-input v-model="userInfoFrom.zipCode" :placeholder="this.userInfoFrom.zipCode"></el-input>
        </el-form-item>
        <el-form-item
          label="City"
          prop="city"
        >
          <el-input v-model="userInfoFrom.city" :placeholder="this.userInfoFrom.city"></el-input>
        </el-form-item>
        <el-form-item
          label="Country"
          prop="country"
        >
          <el-select
            v-model="userInfoFrom.country"
            style="width: 100%"
            :placeholder="this.userInfoFrom.country"
          >
            <el-option label="America" value="America"></el-option>
            <el-option label="China" value="China"></el-option>
            <el-option label="Japan" value="Japan"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          label="username"
          prop="username"
        >
          <el-input v-model="userInfoFrom.username" :placeholder="this.userInfoFrom.username"></el-input>
        </el-form-item>
        <el-form-item
          label="email"
          prop="email"
        >
          <el-input v-model="userInfoFrom.email" :placeholder="this.userInfoFrom.email"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="changeUserInfo">update</el-button>
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
      userInfoFrom: {
        username: '',
        email: '',
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
        country: '',
        city: ''
      }
    }
  },
  methods: {
    changeUserInfo () {
      let obj = {
        workplace: this.userInfoFrom.workplace,
        jobType: this.userInfoFrom.jobType,
        title: this.userInfoFrom.title,
        firstName: this.userInfoFrom.firstName,
        lastName: this.userInfoFrom.lastName,
        twitter: this.userInfoFrom.twitter,
        facebook: this.userInfoFrom.facebook,
        affiliation: this.userInfoFrom.affiliation,
        address1: this.userInfoFrom.address1,
        address2: this.userInfoFrom.address2,
        zipCode: this.userInfoFrom.zipCode,
        city: this.userInfoFrom.city,
        country: this.userInfoFrom.country,
        username: this.userInfoFrom.username,
        email: this.userInfoFrom.email
      }
      let jsonObj = JSON.stringify(obj)
      console.log(jsonObj)
      this.$axios({
        method: 'post',
        url: 'http://127.0.0.1:11000/users/updateData',
        headers:
          {
            'Content-Type': 'application/json;charset=UTF-8',
            'token': storage['token']
          },
        data: jsonObj
      })
        .then(res => {
          console.log(res.data)
          switch (res.data.state) {
            case true:
              this.$notify({
                title: 'Success',
                message: 'Success to Change',
                type: 'success',
                offset: 100
              })
              storage['username'] = this.userInfoFrom.username
              storage['email'] = this.userInfoFrom.email
              storage['workplace'] = this.userInfoFrom.workplace
              storage['jobType'] = this.userInfoFrom.jobType
              storage['title'] = this.userInfoFrom.title
              storage['firstName'] = this.userInfoFrom.firstName
              storage['lastName'] = this.userInfoFrom.lastName
              storage['facebook'] = this.userInfoFrom.facebook
              storage['twitter'] = this.userInfoFrom.twitter
              storage['affiliation'] = this.userInfoFrom.affiliation
              storage['address1'] = this.userInfoFrom.address1
              storage['address2'] = this.userInfoFrom.address2
              storage['zipCode'] = this.userInfoFrom.zipCode
              storage['city'] = this.userInfoFrom.city
              storage['country'] = this.userInfoFrom.country
              window.location.href = 'http://localhost:8080/UserCenter/Profile'
              break
            case false:
              this.$notify.error({
                title: 'Error',
                message: res.data.msg,
                offset: 100
              })
              break
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  mounted () {
    this.userInfoFrom.username = storage['username']
    this.userInfoFrom.email = storage['email']
    this.userInfoFrom.workplace = storage['workplace']
    this.userInfoFrom.jobType = storage['jobType']
    this.userInfoFrom.title = storage['title']
    this.userInfoFrom.firstName = storage['firstName']
    this.userInfoFrom.lastName = storage['lastName']
    if (storage['facebook'] === 'undefined') {
      this.userInfoFrom.facebook = 'None'
    } else {
      this.userInfoFrom.facebook = storage['facebook']
    }
    if (storage['twitter'] === 'undefined') {
      this.userInfoFrom.twitter = 'None'
    } else {
      this.userInfoFrom.twitter = storage['twitter']
    }
    this.userInfoFrom.affiliation = storage['affiliation']
    this.userInfoFrom.address1 = storage['address1']
    if (storage['address2'] === 'undefined') {
      this.userInfoFrom.address2 = 'None'
    } else {
      this.userInfoFrom.address2 = storage['address2']
    }
    this.userInfoFrom.zipCode = storage['zipCode']
    this.userInfoFrom.country = storage['country']
    this.userInfoFrom.city = storage['city']
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
.userInfo-form {
  padding-top: 40px;
  width: 60%;
  padding-left: 15%;
}
</style>
