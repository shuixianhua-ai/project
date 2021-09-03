<template>
  <div class="newsPage">
    <br />
    <br />
    <br />
    <br />
    <!-- 轮播图 -->
    <el-carousel type="card">
      <el-carousel-item  v-for="item in newsArray.slice(0, 3)" :key="item.nid">
        <el-card style="background-color: #a7a7a7">
      <img  @click="gotoNews(newsArray.indexOf(item))" :src="imgurl[newsArray.indexOf(item)]" height="200px" class="image"> <!--获取轮播图图片url -->
      <div style="padding: 14px;">
        <!-- 跳转到新闻详细页面 -->
        <router-link
              :to="{
                path: 'NewsDisplay',
                query: {id: newsArray.indexOf(item)},
              }">
              {{ item.title }}
        </router-link>
      </div>
    </el-card>
      </el-carousel-item>
    </el-carousel>
    <!-- {{imgurl}} -->
    <br />
    <br />
    <h1 v-if="temp">News Page</h1>
    <br />
    <button @click="changeVisiable" style="float: right" v-if="btn_show">{{ msg_1 }}</button>
    <!-- 发布文章链接跳转 -->
    <br />
    <br />
    <!-- <button style="float: right" v-if="isAdmin" class="post-button"><router-link style="text-decoration: none;" to="/Tinymce"
      >Post News<br
    /></router-link></button> -->
    <el-button  @click="gotoPost" round v-if="isAdmin" class="post-button" style="float: right">Post News<br
    /></el-button>
    <br />
    <br />
    <!-- 新闻列表 -->
    <div style="width: 100%">
      <div
        style="
          width: 100%;
          display: inline-block;
          background-color: #424242;
          float: left;
        "
      >
        <span class="News">Latest News</span>
        <ul class="News1_list">
          <!-- 获取当前分页的新闻 -->
          <li
            class="newslist"
            v-for="item in newsArray.slice(
              (currentPage - 1) * pagesize,
              currentPage * pagesize
            )"
            :key="item.nid"
          >
            <button @click="deleteNews(item.nid)" class="edit" v-if="isAdmin" style="float: right">
               DELETE
            </button>
            <!-- 详细新闻页面跳转链接，内容为标题 -->
            <router-link
              :to="{
                path: 'NewsDisplay',
                query: {id: newsArray.indexOf(item)},
              }"
            >
              {{ item.title }}</router-link
            >
            <!-- 新闻作者以及新闻发布时间 -->
            <span class="postTimeSpan"
              >{{ item.author }}, {{ item.postTime }}</span
            >
            <br />
          </li>
          <br />
          <br />
        </ul>
        <!-- 分页控制 -->
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[5, 10, 15, 20]"
          :page-size="pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="newsArray.length"
        >
        </el-pagination>
      </div>
    </div>
    <!-- 显示当前时间 -->
    <div class="date">
      {{ date }}
    </div>
  </div>
</template>

<script>
let storage = window.localStorage
export default {
  name: 'NewsPage',
  data () {
    return {
      Newscontent: '',
      newsid: 0,
      // 轮播图图片url
      defaultimgurl: 'http://localhost:8080/static/img/small_logo.5c5e27a.jpg',
      imgurl: [
        require('../../assets/pictures/logo.jpg'),
        require('../../assets/pictures/logo.jpg'),
        require('../../assets/pictures/logo.jpg')
      ],
      // 分页展示控制
      currentPage: 1, // 当前页面
      pagesize: 5, // 每页展示的新闻条数
      // 显示控制
      msg_show: true, // 控制显示
      btn_show: false, // 控制按钮显示
      msg_1: 'Change to admin view',
      // 底部时间控制
      nowTime: '',
      date: new Date(),
      temp: false,
      // 新闻数据
      newsArray: [],
      // test_utype: storage['utype'] === 1,
      isAdmin: false
      // 用于测试的本地新闻数据
      // newsArray_local: [{nid: 1, title: 'title1', author: 'author1', contents: '<html><div>sasas</div></html>', postTime: '2021.1.1'},
      // {nid: 2, title: 'title2', author: 'author1', contents: '<html><div>sasas</div></html>', postTime: '2021.1.1'},
      // {nid: 3, title: 'title3', author: 'author2', contents: '<html><div>sasas</div></html>', postTime: '2021.1.1'},
      // {nid: 4, title: 'title4', author: 'author3', contents: '<html><div>sasas</div></html>', postTime: '2021.1.1'},
      // {nid: 5, title: 'title5', author: 'author4', contents: '<html><div>sasas</div></html>', postTime: '2021.1.1'},
      // {nid: 6, title: 'title6', author: 'author5', contents: '<html><div>sasas</div></html>', postTime: '2021.1.1'},
      // {nid: 7, title: 'title7', author: 'author6', contents: '<html><div>sasas</div></html>', postTime: '2021.1.1'},
      // {nid: 8, title: 'title8', author: 'author7', contents: '<html><div>sasas</div></html>', postTime: '2021.1.1'},
      // {nid: 9, title: 'title9', author: 'author8', contents: '<html><div>sasas</div></html>', postTime: '2021.1.1'},
      // {nid: 10, title: 'title10', author: 'author9', contents: '<html><div>sasas</div></html>', postTime: '2021.1.1'},
      // {nid: 11, title: 'title11', author: 'author1', contents: '<html><div>sasas</div></html>', postTime: '2021.1.1'},
      // {nid: 12, title: 'title12', author: 'author1', contents: '<html><div>sasas</div></html>', postTime: '2021.1.1'},
      // {nid: 13, title: 'title13', author: 'author1', contents: '<html><div>sasas</div></html>', postTime: '2021.1.1'},
      // {nid: 14, title: 'title14', author: 'author1', contents: '<html><div>sasas</div></html>', postTime: '2021.1.1'},
      // {nid: 15, title: 'title15', author: 'author1', contents: '<html><div>sasas</div></html>', postTime: '2021.1.1'},
      // {nid: 16, title: 'title16', author: 'author1', contents: '<html><div>sasas</div></html>', postTime: '2021.1.1'},
    }
  },

  methods: {
    // 删除新闻
    gotoNews (id) {
      this.$router.push({path: 'NewsDisplay', query: {id: id}})
      // let routeData = this.$router.resolve({
      //   path: 'NewsDisplay',
      //   query: {id: id}
      // })
      // window.open(routeData.href)
    },
    gotoPost () {
      this.$router.push({path: 'Tinymce'})
    },
    deleteNews (nid) {
      // console.log(0)
      this.$axios({
        method: 'delete',
        url: 'http://116.62.228.138:10003/news/deleteNews',
        headers:
          {
            // 'Content-Type': 'application/json;charset=UTF-8',
            'token': storage['token']
          },
        params: {
          nid: nid
        }
      })
      // console.log(0)
        .then(res => {
          if (res.data.state === true) {
            console.log(res.data)
            this.$notify({
              title: 'Success',
              message: 'Success to delete',
              type: 'success',
              offset: 100
            })
            window.location.href = 'http://localhost:8080/News'
          } else {
            console.log(res.data)
            this.$notify.error({
              title: 'Error',
              message: res.msg,
              offset: 100
            })
          }
        })
    },
    // 控制页面大小
    handleSizeChange: function (size) {
      this.pagesize = size
      console.log(this.pagesize) // 每页下拉显示数据
    },

    // 控制当前页
    handleCurrentChange: function (currentPage) {
      this.currentPage = currentPage
      console.log(this.currentPage) // 点击第几页
    },

    // 是否显示编辑按钮以及按钮字符更改
    changeVisiable () {
      this.msg_show ? (this.msg_show = false) : (this.msg_show = true)
      this.msg_show
        ? (this.msg_1 = 'Change to admin view')
        : (this.msg_1 = 'Change to tourist view')
      this.btn_show ? (this.btn_show = false) : (this.btn_show = true)
    }
  },

  mounted () {
    // 利用定时器显示当前时间
    let _this = this // 声明一个变量指向Vue实例this，保证作用域一致
    this.timer = setInterval(() => {
      _this.date = new Date() // 修改数据date
    }, 1000)

    // 获取新闻数据
    this.$axios({
      method: 'get',
      url: 'http://116.62.228.138:10003/news/articleGetAll'
    }).then((res) => {
      console.log(res.data.data)
      this.newsArray = res.data.data // 将获取的数据存入本地变量
      console.log(this.newsArray)
      for (var j = 0; j < 3; j++) {
        let imgReg = /<img.*?(?:>|\/>)/gi // 匹配图片中的img标签
        let srcReg = /src=[\'\"]?([^\'\"]*)[\'\"]?/i // 匹配图片中的src
        let str = this.newsArray[j].contents
        let arr = str.match(imgReg) // 筛选出所有的img
        console.log(j + 'arr' + arr)
        let srcArr = []
        if (arr !== null) {
          for (let i = 0; i < arr.length; i++) {
            let src = arr[i].match(srcReg)
            // 获取图片地址
            srcArr.push(src[1])
          }
          this.imgurl[j] = srcArr[0]
        }
      }
    })

    this.isAdmin = (storage.type === '2' && storage.isLogin === 'true')
  },

  // 在Vue实例销毁前，清除定时器
  beforeDestroy () {
    if (this.timer) {
      clearInterval(this.timer)
    }
  }
}
</script>

<style scoped>
h2 {
  font-weight: normal;
  color: #f7f8f8;
}
/* 设置链接样式 */
a {
  color: #ffffff;
}
.newsPage {
  text-align: center;
}
/* 新闻列表标题字体设置 */
.News {
  color: #f7f8f8;
  text-align: left;
}
/* 新闻列表字体 */
.News1_list {
  color: aliceblue;
  text-align: left;
}
/* 当前时间字体 */
.date {
  color: rgba(133, 115, 115, 0.555);
}
.newslist {
  color: aliceblue;
  padding-top: 20px;
}
.postTimeSpan {
  color: rgba(255, 255, 255, 0.555);
  float: right;
}
.edit {
  background-color: unset;
  mask-type: initial;
}
/* 底部联系方式样式设置 */
.footer_clear{
    font-family: "microsoft yahei",sans-serif;
    margin: 0px;
    zoom: 1;
    margin-top: 40px;
    padding: 30px 0 35px;
    color: #fff;
    font-size: 14px
}
.post-button{
  background-color: black;
  border-block-color: none;
  text-decoration: none;
}

el-card {
  cursor: help;
}
el-carousel-item{
  cursor: default;
}
el-carousel {
  cursor: pointer;
}

</style>
