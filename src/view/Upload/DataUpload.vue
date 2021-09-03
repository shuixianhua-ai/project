<template>
  <div class="articlePost-box" style="padding-top: 50px">
    <div class="articlePost-container">
      <div class="articlePost-title">Image Upload</div>
      <div class="articlePost-form">
        <el-form :inline="true" :model="articleForm" ref="articleForm" label-width="100px" size="medium">
          <el-form-item
            label="URI"
            prop="uri"
            :rules="[
                  { required: true, message: 'Please input uri', trigger: 'blur' }
                ]"
          >
            <div class="box-width">
              <el-input v-model="articleForm.uri" @blur="isfilled"></el-input>
            </div>
          </el-form-item>
          <el-form-item
            label="Title"
            prop="title"
            :rules="[
                  { required: true, message: 'Please input title', trigger: 'blur' }
                ]"
          >
            <div class="box-width">
              <el-input v-model="articleForm.title" @blur="isfilled"></el-input>
            </div>
          </el-form-item>
          <el-form-item
            label="Platform"
            prop="platFormName"
            :rules="[
                  { required: true, message: 'Please input platFormName', trigger: 'blur' }
                ]"
          >
            <div class="box-width">
              <el-input v-model="articleForm.platFormName" @blur="isfilled"></el-input>
            </div>
          </el-form-item>
          <el-form-item
            label="Product"
            prop="productType"
            :rules="[
                  { required: true, message: 'Please input productType', trigger: 'blur' }
                ]"
          >
            <div class="box-width">
              <el-input v-model="articleForm.productType"></el-input>
            </div>
          </el-form-item>

          <el-form-item
            label="Date"
            prop="title"
            :rules="[
                  { required: true, message: 'Please input date', trigger: 'blur' }
                ]"
          >
            <div class="box-width1">
              <el-date-picker
                v-model="articleForm.date"
                type="date"
                placeholder="选择日期">
              </el-date-picker>
            </div>
          </el-form-item>

          <el-form-item
            label="Disaster ID"
            prop="title"
            :rules="[
                  { required: true, message: 'Please input DisasterId', trigger: 'blur' }
                ]"
          >
            <div class="box-width1">
              <el-select v-model="articleForm.disasterId" placeholder="请选择">
                <el-option
                  v-for="item in option"
                  :key="item.did"
                  :label="item.name"
                  :value="item.did">
                </el-option>
              </el-select>
            </div>
          </el-form-item>
          <el-form-item
            label="Resolution"
            prop="title"
            :rules="[
                  { required: true, message: 'Please input resolution', trigger: 'blur' }
                ]"
          >
            <div class="box-width">
              <el-input v-model="articleForm.resolution" @blur="isfilled"></el-input>
            </div>
          </el-form-item>
          <el-form-item
            label="Cloud Cover"
            prop="title"
            :rules="[
                  { required: true, message: 'Please input cloudcoverpercentage', trigger: 'blur' }
                ]"
          >
            <div class="box-width">
              <el-input v-model="articleForm.cloudcoverpercentage" @blur="isfilled"></el-input>
            </div>
          </el-form-item>
          <el-form-item
            label="Instrument"
            prop="title"
            :rules="[
                  { required: true, message: 'Please input instrumentname', trigger: 'blur' }
                ]"
          >
            <div class="box-width">
              <el-input v-model="articleForm.instrumentname" @blur="isfilled"></el-input>
            </div>
          </el-form-item>
          <!--          <el-form-item-->
          <!--            label="OrbitNumber"-->
          <!--            prop="title"-->
          <!--            :rules="[-->
          <!--                  { required: true, message: 'Please input orbitNumber', trigger: 'blur' }-->
          <!--                ]"-->
          <!--          >-->
          <!--            <el-input v-model="articleForm.orbitnumber"></el-input>-->
          <!--          </el-form-item>-->

          <!--          <el-form-item-->
          <!--            label="Author"-->
          <!--            prop="author"-->
          <!--            :rules="[-->
          <!--                  { required: true, message: 'Please input the author', trigger: 'blur' }-->
          <!--                ]"-->
          <!--          >-->
          <!--            <el-input v-model="articleForm.author"></el-input>-->
          <!--          </el-form-item>-->
          <el-form-item>
            <el-upload action=""
                       :http-request="uploadMeta"
            >
              <el-button size="small" type="primary">SELECT</el-button>
            </el-upload>
          </el-form-item>

          <el-form-item>
            <el-upload action=""
                       :http-request="uploadSectionFile">
              <el-button size="small" type="primary" :disabled="!canupload">UPLOAD</el-button>

            </el-upload>

            <el-progress v-show="uploadPercent" :text-inside="true" :stroke-width="18"
                         :percentage="uploadPercent"></el-progress>
            <!--            <el-button type="primary" @click="fileUpload()">Upload File</el-button>-->
            <!--            <el-button type="primary" @click="articlePost()">Post</el-button>-->
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
import tinymce from '../../components/tinymce-editor/tinymce-editor'
import axios from 'axios'

let server = 'http://116.62.228.138:10007/'
// let storage = window.localStorage
export default {
  components: {
    tinymce
  },
  data () {
    return {
      articleForm: {
        uri: '',
        title: '',
        platFormName: '',
        productType: '',
        date: '',
        resolution: '',
        cloudcoverpercentage: '',
        instrumentname: '',
        orbitnumber: '',
        disasterId: ''
      },
      canupload: false,
      uploadPercent: 0,
      option: ''
    }
  },
  mounted () {
    this.$axios({
      method: 'post',
      url: 'http://116.62.228.138:10001/disaster'
    }).then(res => {
      console.log(res.data)
      this.option = res.data
    })
  },
  methods: {
    fileUpload () {
    },
    isfilled () {
      // console.log('test')
      let params = {
        uri: this.articleForm.uri,
        title: this.articleForm.title,
        platFormName: this.articleForm.platFormName,
        productType: this.articleForm.productType,
        date: this.articleForm.date,
        resolution: this.articleForm.resolution,
        cloudcoverpercentage: this.articleForm.cloudcoverpercentage,
        instrumentname: this.articleForm.instrumentname,
        // orbitnumber: this.articleForm.orbitnumber,
        disasterId: this.articleForm.disasterId
      }
      if (params.uri === '' || params.title === '' || params.platFormName === '' || params.productType === '' || params.date === '' || params.resolution === '' || params.cloudcoverpercentage === '' ||
        params.instrumentname === '' || params.disasterId === '') {
        this.canupload = false
      } else {
        this.canupload = true
      }
    },
    uploadMeta (params) {
      let form = new FormData()
      form.append('file', params.file)
      const self = this
      axios.post(server + 'metaparse', form).then(function (response) {
        console.log('resp')
        console.log(response)
        self.articleForm = response['data']
      })
    },
    uploadSectionFile (param) {
      let form = new FormData()
      var that = this
      let params = {
        uri: this.articleForm.uri,
        title: this.articleForm.title,
        platFormName: this.articleForm.platFormName,
        productType: this.articleForm.productType,
        date: this.articleForm.date,
        resolution: this.articleForm.resolution,
        cloudcoverpercentage: this.articleForm.cloudcoverpercentage,
        instrumentname: this.articleForm.instrumentname,
        orbitnumber: this.articleForm.orbitnumber,
        disasterId: this.articleForm.disasterId
      }
      console.log(params)
      console.log(this.articleForm.uri)
      if (params.uri === '' || params.title === '' || params.platFormName === '' || params.productType === '' || params.date === '' || params.resolution === '' || params.cloudcoverpercentage === '' ||
        params.instrumentname === '' || params.disasterId === '') {
        alert('Please fill the blank')
      } else {
        form.append('mid', params.uri)
        form.append('title', params.title)
        form.append('platFormName', params.platFormName)
        form.append('productType', params.productType)
        form.append('date', params.date)
        form.append('resolution', params.resolution)
        form.append('cloudcoverpercentage', params.cloudcoverpercentage)
        form.append('instrumentname', params.instrumentname)
        // form.append('orbitnumber', params.orbitnumber)
        form.append('disasterId', params.disasterId)
        form.append('file', param.file)
        form.append('dir', params.id)
        console.log(form)
        console.log(params)

        that.$axios.post('http://116.62.228.138:10001/upload', form, {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          onUploadProgress: progressEvent => {
            this.uploadPercent = (progressEvent.loaded / progressEvent.total * 100) | 0
          }
        }).then((res) => {
          console.log(this.uploadPercent)
          console.log('上传结束')
          console.log(res)
        }).catch((err) => {
          console.log('上传错误')
          console.log(err)
        })
      }
      // console.log(params)
    },
    articlePost (formName) {
      let params = {
        mid: this.articleForm.uri,
        title: this.articleForm.title,
        platFormName: this.articleForm.platFormName,
        productType: this.articleForm.productType,
        date: this.articleForm.date,
        resolution: this.articleForm.resolution,
        cloudcoverpercentage: this.articleForm.cloudcoverpercentage,
        instrumentname: this.articleForm.instrumentname,
        orbitnumber: this.articleForm.orbitnumber,
        disasterId: this.articleForm.disasterId
      }
      let jsonParams = JSON.stringify(params)
      console.log(jsonParams)
      this.$axios({
        method: 'post',
        url: 'http://116.62.228.138:10003/news/articlePost',
        headers:
          {
            'Content-Type': 'application/json;charset=UTF-8'
          },
        data: jsonParams
      })
        .then(res => {
          if (res.data.state === true) {
            this.$notify({
              title: 'Success',
              message: 'Success to Register',
              type: 'success',
              offset: 100
            })
            window.location.href = 'http://localhost:8080/News'
          } else {
            this.$notify.error({
              title: 'Error',
              message: res.msg,
              offset: 100
            })
          }
        })
    }
  }
}
</script>

<style>
.articlePost-box {
  width: 100vw;
  height: 130vh;
  box-sizing: border-box;
}

.articlePost-container {
  width: 60%;
  height: 70%;
  position: relative;
  top: 35%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  border-radius: 20px;
  box-shadow: 0 0 3px #f0f0f0,
  0 0 6px #f0f0f0;
}

.articlePost-form {
  width: 75%;
  height: 40%;
  padding-left: 10%;
  /*display: flex;*/
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}

.box-width {
  width: 30vw;
  align-items: center;
}

.box-width1 {
  width: 12vw;
}

.articlePost-title {
  padding-top: 50px;
  padding-bottom: 50px;
  font-size: 1.5em;
  font-weight: bold;
  color: rgb(57, 167, 176);
}
</style>
