<template>
  <div class="newsdisplay">
    <div>
      <!-- {{newsArray}} -->
        <h1 class="News">{{News.title}}</h1>
        <h2 class="News">Author: {{News.author}}, time: {{News.postTime}}</h2>
        <!-- {{NewsContents}} -->
        <div class = "News" v-html="News.contents">
        </div>
    </div>
    <div class="date">
      {{ date }}
    </div>
  </div>
</template>

<script>
let storage = window.localStorage
console.log(storage)
export default {
  name: 'newsdisplay',
  data () {
    return {
      News: {},
      nowTime: '',
      date: new Date(),
      temp: false,
      newsArray: [],
      test_utype: storage['type'] === 1

      // 用于测试的本地数据

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

  mounted () {
    // 页底时间

    let _this = this
    // 声明一个变量指向Vue实例this，保证作用域一致
    this.timer = setInterval(() => {
      _this.date = new Date()
      // 修改数据date
    }, 1000)

    // 请求数据
    this.$axios({
      method: 'get',
      url: 'http://116.62.228.138:10003/news/articleGetAll'
    }).then((res) => {
      console.log(res.data.data)
      this.newsArray = res.data.data
      console.log(this.newsArray)

      // 通过传递来的参数决定需要展示的新闻对象
      this.News = this.newsArray[this.$route.query.id]
      console.log(this.News)
    })
  },
  beforeDestroy () {
    if (this.timer) {
      clearInterval(this.timer)
      // 在Vue实例销毁前，清除定时器
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
.News {
  color: #f7f8f8;
  text-align: center;
}
.date {
  color: rgba(133, 115, 115, 0.555);
    position: inherit;
}

.footer_clear{
    font-family: "microsoft yahei",sans-serif;
    margin: 0px;
    zoom: 1;
    /* background: url(../images/footer_bg.png) no-repeat; */
    /* background-color: #003F88; */
    margin-top: 40px;
    padding: 30px 0 35px;
    color: #fff;
    font-size: 14px
}

</style>
