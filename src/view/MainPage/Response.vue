<template>
  <div>
    <!-- <img src="../../assets/pictures/MainPage-img/start.jpg" id="menu"> -->
    <el-button type="text" @click="dialogFormVisible = true" > <nav id="menu">START</nav></el-button>
    <el-dialog title="Disasters Response" :visible.sync="dialogFormVisible"  @closed="handleClose">
          <div class="response-box">
              <div class="response-container">
              <div class="response-form">
                  <el-form :model="responseForm" ref="responseForm" label-width="140px" size="medium">
                  <el-form-item
                      label="Disaster name"
                      prop="name"
                      :rules="{ required: true, message: 'Please input the disaster name', trigger: 'blur' }"
                  >
                      <el-input v-model="responseForm.name"></el-input>
                  </el-form-item>
                  <el-form-item
                      label="Longitude"
                      prop="lon"
                      :rules="[
                          { required: true, message: 'Please input the longitude', trigger: 'blur' }
                          ]"
                  >
                      <el-input v-model="responseForm.lon"></el-input>
                  </el-form-item>
                  <el-form-item
                      label="Latitude"
                      prop="lat"
                      :rules="[
                          { required: true, message: 'Please input the latitude', trigger: 'blur' }
                          ]"
                  >
                      <el-input v-model="responseForm.lat"></el-input>
                  </el-form-item>
                  <el-form-item
                      label="Country"
                      prop="country"
                      :rules="[
                          { required: true, message: 'Please input the country', trigger: 'blur' }
                          ]"
                  >
                      <el-input v-model="responseForm.country"></el-input>
                  </el-form-item>
                  <el-form-item
                      label="Disaster Type"
                      prop="tag"
                      :rules="[
                          { required: true, message: 'Please select the disaster type', trigger: 'blur' }
                          ]"
                  >
                      <el-select
                      v-model="responseForm.tag"
                      style="width: 100%"
                      placeholder=" "
                      >
                      <el-option label="Earthquake" value="Earthquake"></el-option>
                      <el-option label="Fire" value="Fire"></el-option>
                      <el-option label="Snow" value="Snow"></el-option>
                      <el-option label="Rainstorm" value="Rainstorm"></el-option>
                      <el-option label="Typhoon" value="Typhoon"></el-option>
                      <el-option label="Volcanic eruption" value="Volcanic eruption"></el-option>
                      <el-option label="Ocean wave" value="Ocean wave"></el-option>
                      <el-option label="Other" value="Other"></el-option>
                      </el-select>

                  </el-form-item>
                  <el-form-item
                      label="AOI(json)"
                      prop="aoijson"
                      :rules="{ required: true, message: 'Please input the AOI(json)', trigger: 'blur' }"
                  >
                      <el-input v-model="responseForm.aoijson" rows="2" type="textarea"></el-input>
                  </el-form-item>
                  <el-form-item
                      label="Descrption"
                      prop="description"
                  >
                      <el-input v-model="responseForm.description" rows="5" type="textarea"></el-input>
                  </el-form-item>
                  </el-form>
              </div>
          </div>
        </div>
        <el-button @click="dialogFormVisible = false">Cancel</el-button>
        <el-button type="primary" @click="response('responseForm')">Response</el-button>
    
      </el-dialog>
  </div>
</template>

<script>
let storage = window.localStorage

export default {
    name: 'response',
  data () {
    return {
      type:storage['type'],
      dialogFormVisible: false,
      responseForm: {
          name : '',
          country: '',
          lon: '',
          lat: '',
          start_time:'',
          end_time: '',
          dtype: '',
          tag: '',
          sponsor: storage['affiliation'],
          responser: 'ChinaGEO Disaster data response mechanism CDDR',
          aoijson:''
      },
      formLabelWidth: '120px',
    }
  },

 mounted () {
    this.init()
  },
  methods: {
      init(){
      var id = 'Response';

      var link = document.createElement('a');
      link.href = '#';
      link.className = 'active';

      link.onclick = function (e) {
          console.log("respon 方法")
      };

      var responseLayers = document.getElementById('menu');
      responseLayers.appendChild(link);
      },
    //判断用户是否有发起权限
    dtype(tag){
      switch (tag){
                case 'Earthquake':
                    this.responseForm.dtype=1;
                    break;
                case 'Fire':
                    this.responseForm.dtype=2;
                    break;
                case 'Landslide':
                  this.responseForm.dtype=3;
                  break;
                case 'Snow':
                  this.responseForm.dtype=4;
                  break;
                case 'Rainstorm':
                  this.responseForm.dtype=5;
                  break; 
                case 'Typhoon':
                  this.responseForm.dtype=6;
                  break; 
                case 'Volcanic eruption':
                  this.responseForm.dtype=7;
                  break;
                case 'Ocean wave':
                  this.responseForm.dtype=8;
                  break;
                case 'Other':
                  this.responseForm.dtype=9;
                  break;
            
      } 
    },
    //初始化表单
    handleClose () {
      this.$refs.responseForm.resetFields()
      this.responseForm={
          name : '',
          country: '',
          lon: '',
          lat: '',
          start_time:'',
          end_time: '',
          dtype: '',
          tag: '',
          sponsor: storage['affiliation'],
          responser: 'ChinaGEO Disaster data response mechanism CDDR',
          aoi: '',
          aoijson:''
      }
    },
     //提交表单
     response (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
            this.dtype(this.responseForm.tag)
            let obj = {
              name : this.responseForm.name,
              country: this.responseForm.country,
              lon: this.responseForm.lon,
              lat: this.responseForm.lat,
              start_time:this.responseForm.start_time,
              end_time: this.responseForm.end_time,
              dtype: this.responseForm.dtype,
              tag: this.responseForm.tag,
              sponsor: this.responseForm.sponsor,
              responser: this.responseForm.responser,
              aoijson:this.responseForm.aoijson,
              description:this.responseForm.description
            }
            let jsonObj = JSON.stringify(obj)
            console.log(jsonObj)
            this.$axios({
              method: 'post',
              url: 'http://116.62.228.138:10003/disasterResponse/saveDisaster',
              headers:
                {
                  'Content-Type': 'application/json;charset=UTF-8',
                  'token': storage['token']
                },
              data: jsonObj
            })
              .then(res => {
                this.$notify({
                      title: 'Success',
                      message: 'Success to response',
                      type: 'success',
                      offset: 100
                    })
                    window.location.href = 'http://localhost:8080'
              })
              .catch(err => {
                console.log(err)
              })
              this.dialogFormVisible = false
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

<style lang="less" scoped>
#menu {
        background: #be3838;
        position: absolute;
        z-index: 1;
        top: 370px;
        right: 20px;
        border-radius: 50px;
        width: 120px;
        height: 50px;
        border: 1px solid rgba(0,0,0,0.4);
        font-family: 'Open Sans', sans-serif;
        line-height:50px;
        color: white;
    }
</style>