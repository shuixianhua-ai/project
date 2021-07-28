<template>
  <div class='newsPage'>
    <br />
    <br />
    <br />

    <h1 v-if="temp">News Page</h1>
    <el-carousel width='200px'>
      <el-carousel-item>
        <img src="../../assets/pictures/logo.png" class="carousel_image_type" />
      </el-carousel-item>
      <el-carousel-item>
        <img src="../../assets/pictures/logo.png" class="carousel_image_type" />
      </el-carousel-item>
      <el-carousel-item>
        <img src="../../assets/pictures/logo.png" class="carousel_image_type" />
      </el-carousel-item>
    </el-carousel>
    <br />
    <button @click="changeVisiable" style="float: right">{{ msg_1 }}</button>
    <button v-if="show" style="float: right">Issue News</button>
    <br />
    <br />
    <div style="width: 100%">
      <div
        style="
          width: 50%;
          height: 400px;
          display: inline-block;
          background-color: #424242;
          float: left;
        "
      >
        <span class="News">News1</span>
        <ul class="News1_list">
          <li>
            <a href="../../assets/FAQ _ Vetur.html" target="_blank" class="prev"
              >Global components</a
            >
            <button class="edit" v-if="btn_show" style="float: right">
              DELETE
            </button>
            <button class="edit" v-if="btn_show" style="float: right">
              EDIT
            </button>
          </li>
          <br />
          <li>
            <a href="../../assets/FAQ _ Vetur.html" target="_blank" class="prev"
              >Global components</a
            >
            <button class="edit" v-if="btn_show" style="float: right">
              DELETE
            </button>
            <button class="edit" v-if="btn_show" style="float: right">
              EDIT
            </button>
          </li>
          <br />
          <li>
            <a href="../../assets/FAQ _ Vetur.html" target="_blank" class="prev"
              >Global components</a
            >
            <button class="edit" v-if="btn_show" style="float: right">
              DELETE
            </button>
            <button class="edit" v-if="btn_show" style="float: right">
              EDIT
            </button>
          </li>
          <br />
          <li>
            <a href="../../assets/FAQ _ Vetur.html" target="_blank" class="prev"
              >Global components</a
            >
            <button class="edit" v-if="btn_show" style="float: right">
              DELETE
            </button>
            <button class="edit" v-if="btn_show" style="float: right">
              EDIT
            </button>
          </li>
          <br />
          <li>
            <a href="../../assets/FAQ _ Vetur.html" target="_blank" class="prev"
              >Global components</a
            >
            <button class="edit" v-if="btn_show" style="float: right">
              DELETE
            </button>
            <button class="edit" v-if="btn_show" style="float: right">
              EDIT
            </button>
          </li>
          <br />
        </ul>
      </div>
      <div
        style="
          width: 50%;
          height: 400px;
          background-color: grey;
          display: inline-block;
          margin-left: 0;
          float: right;
        "
      >
        <span class="News">News1</span>
        <ul class="News1_list">
          <li>
            <a href="../../assets/FAQ _ Vetur.html" target="_blank" class="prev"
              >Global components</a
            >
            <button class="edit" v-if="btn_show" style="float: right">
              DELETE
            </button>
            <button class="edit" v-if="btn_show" style="float: right">
              EDIT
            </button>
          </li>
          <br />
          <li>
            <a href="../../assets/FAQ _ Vetur.html" target="_blank" class="prev"
              >Global components</a
            >
            <button class="edit" v-if="btn_show" style="float: right">
              DELETE
            </button>
            <button class="edit" v-if="btn_show" style="float: right">
              EDIT
            </button>
          </li>
          <br />
          <li>
            <a href="../../assets/FAQ _ Vetur.html" target="_blank" class="prev"
              >Global components</a
            >
            <button class="edit" v-if="btn_show" style="float: right">
              DELETE
            </button>
            <button class="edit" v-if="btn_show" style="float: right">
              EDIT
            </button>
          </li>
          <br />
          <li>
            <a href="../../assets/FAQ _ Vetur.html" target="_blank" class="prev"
              >Global components</a
            >
            <button class="edit" v-if="btn_show" style="float: right">
              DELETE
            </button>
            <button class="edit" v-if="btn_show" style="float: right">
              EDIT
            </button>
          </li>
          <br />
          <li>
            <a href="../../assets/FAQ _ Vetur.html" target="_blank" class="prev"
              >Global components</a
            >
            <button class="edit" v-if="btn_show" style="float: right">
              DELETE
            </button>
            <button class="edit" v-if="btn_show" style="float: right">
              EDIT
            </button>
          </li>
          <br />
        </ul>
      </div>
    </div>

    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <div class="date">
      {{ date }}
    </div>
  </div>
</template>

<script>
let newsArray = []
export default {
  name: 'NewsPage',
  data () {
    return {
      show: true,
      btn_show: true,
      msg_1: 'Change to tourist view',
      nowTime: '',
      date: new Date(),
      systemMsg: [
        { id: 1, title: 'Scroll_News1' },
        { id: 2, title: 'Scroll_News2' },
        { id: 3, title: 'Scroll_News3' }
      ],
      temp: false
    }
  },
  methods: {
    changeVisiable () {
      this.show ? (this.show = false) : (this.show = true)
      this.show
        ? (this.msg_1 = 'Change to tourist view')
        : (this.msg_1 = 'Change to Admin view')
      this.btn_show ? (this.btn_show = false) : (this.btn_show = true)
    }
  },
  mounted () {
    let _this = this // 声明一个变量指向Vue实例this，保证作用域一致
    this.timer = setInterval(() => {
      _this.date = new Date() // 修改数据date
    }, 1000)
    this.$axios({
      method: 'get',
      url: 'http://127.0.0.1:11000/news/articleGetAll'
    })
      .then(res => {
        console.log(res.data.data)
        newsArray = res.data.data
        console.log(newsArray)
      })
  },
  beforeDestroy () {
    if (this.timer) {
      clearInterval(this.timer) // 在Vue实例销毁前，清除我们的定时器
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
  color: #f7f8f8;
}
a {
  color: #ffffff;
}
.newsPage {
  text-align: center;
}
.carousel_image_type {
  width: 40;
}
.News {
  color: #f7f8f8;
  text-align: left;
}
.News1_list {
  color: aliceblue;
  text-align: left;
}
.edit {
  background-color: unset;
  mask-type: initial;
}
.date {
  color: rgba(133, 115, 115, 0.555);
}
</style>
