<template>
  <div class="articlePost-box" style="padding-top: 50px">
    <div class="articlePost-container">
      <div class="articlePost-title">Article Post</div>
      <div class="articlePost-form">
        <el-form :model="articleForm" ref="articleForm" label-width="100px" size="medium">
          <el-form-item
            label="Title"
            prop="title"
            :rules="[
                  { required: true, message: 'Please input the title', trigger: 'blur' }
                ]"
          >
            <el-input v-model="articleForm.title"></el-input>
          </el-form-item>
          <el-form-item
            label="Author"
            prop="author"
            :rules="[
                  { required: true, message: 'Please input the author', trigger: 'blur' }
                ]"
          >
            <el-input v-model="articleForm.author"></el-input>
          </el-form-item>
          <el-form-item>
            <tinymce id="d1" v-model="articleForm.content"></tinymce>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="articlePost()">Post</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import tinymce from '../../components/tinymce-editor/tinymce-editor'
let storage = window.localStorage
export default {
  components: {
    tinymce
  },
  data () {
    return {
      articleForm: {
        title: '',
        author: storage['firstName'] + ' ' + storage['lastName'],
        content: '<p>Input your article</p>'
      }
    }
  },
  mounted () {

  },
  methods: {
    articlePost (formName) {
      let params = {
        title: this.articleForm.title,
        author: this.articleForm.author,
        content: this.articleForm.content
      }
      let jsonParams = JSON.stringify(params)
      console.log(jsonParams)
      this.$axios({
        method: 'post',
        url: 'http://127.0.0.1:11000/news/articlePost',
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
  width: 70%;
  height: 70%;
  position: relative;
  top: 35%;
  left: 50%;
  transform: translate(-50%,-50%);
  background-color: #fff;
  border-radius: 20px;
  box-shadow: 0 0 3px #f0f0f0,
  0 0 6px #f0f0f0;
}
.articlePost-form {
  width: 70%;
  height: 40%;
  padding-left: 10%;
  /*display: flex;*/
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}
.articlePost-title {
  padding-top: 50px;
  padding-bottom: 50px;
  font-size: 1.5em;
  font-weight: bold;
  color: rgb(57,167,176);
}
</style>
