<template>
  <div class="mainPage">
    <div><h1></h1></div>
   <div><Map></Map></div>
   <el-row :gutter="20">
    <el-col :span="18">
      <div class="grid-content bg-purple">

      <!-- Disasters -->
        <el-row class="row-header" type="flex" justify="center">
          <el-col :span="20">
            <h1>Disasters</h1>
          </el-col>
        </el-row>

            <el-card :body-style="{ padding: '0px' }">
              <div style="padding: 14px;">
                  <router-link :to="{path:'/DisasterDisplay',query:{id:1}}">
                    Earthquake
                  <img src="../../assets/pictures/MainPage-img/Earthquake.jpg" class="image">
                </router-link>
              </div>
            </el-card>

            <el-card :body-style="{ padding: '0px' }">
              <div style="padding: 14px;">
                <router-link :to="{path:'/DisasterDisplay',query:{id:'2'}}">
                    Rainstorm
                    <img src="../../assets/pictures/MainPage-img/Rainstorm.jpg" class="image">
                </router-link>
              </div>
            </el-card>

            <el-card :body-style="{ padding: '0px' }">
              <div style="padding: 14px;">
                <router-link :to="{path:'/DisasterDisplay',query:{id:'3'}}">
                    Landslide
                    <img src="../../assets/pictures/MainPage-img/Landslide.jpg" class="image">
                </router-link>
              </div>
            </el-card>

            <el-card :body-style="{ padding: '0px' }">
              <div style="padding: 14px;">
                <router-link :to="{path:'/DisasterDisplay',query:{id:'4'}}">
                    Snow
                    <img src="../../assets/pictures/MainPage-img/Snow.jpg" class="image">
                </router-link>
              </div>
            </el-card>

            <el-card :body-style="{ padding: '0px' }">
              <div style="padding: 14px;">
                <router-link :to="{path:'/DisasterDisplay',query:{id:'5'}}">
                    Fire
                    <img src="../../assets/pictures/MainPage-img/Fire.jpg" class="image">
                </router-link>
              </div>
            </el-card>

            <el-card :body-style="{ padding: '0px' }">
              <div style="padding: 14px;">
                <router-link :to="{path:'/DisasterDisplay',query:{id:'6'}}">
                    Typhoon
                    <img src="../../assets/pictures/MainPage-img/Typhoon.jpg" class="image">
                </router-link>
              </div>
            </el-card>

            <el-card :body-style="{ padding: '0px' }">
              <div style="padding: 14px;">
                <router-link :to="{path:'/DisasterDisplay',query:{id:'7'}}">
                    Volcanic Eruption
                    <img src="../../assets/pictures/MainPage-img/VolcanicEruption.jpg" class="image">
                </router-link>
              </div>
            </el-card>

            <el-card :body-style="{ padding: '0px' }">
              <div style="padding: 14px;">
                <router-link :to="{path:'/DisasterDisplay',query:{id:'8'}}">
                    Ocean Wave
                    <img src="../../assets/pictures/MainPage-img/OceanWave.jpg" class="image">
                </router-link>
              </div>
            </el-card>

            <el-card :body-style="{ padding: '0px' }">
              <div style="padding: 14px;">
                <router-link :to="{path:'/DisasterDisplay',query:{id:'9'}}">
                    Other
                    <img src="../../assets/pictures/MainPage-img/Other.jpg" class="image">
                </router-link>
              </div>
            </el-card>
    </div>
  </el-col>

      <!-- News -->
  <el-col :span="6">
    <div class="grid-content bg-purple">

        <el-row class="row-header" type="flex" justify="center">
          <el-col :span="20">
            <h1>Latest News</h1>
          </el-col>
        </el-row>

      <div v-for="item in newsArray" :key="item" class="article-title">
        
         <h3 class="asset-title content">
          <router-link target="_blank" :to="{path:'/NewsDisplay',query:{id: newsArray.indexOf(item)}}">
              {{item.title}}
          </router-link>
        </h3>

        <h4 class="asset-title-date content">
          {{item.postTime}}
        </h4>
        
      </div>
  </div>
</el-col>
  </el-row>

  <Footer></Footer>
  <!-- <div><Hello></Hello></div> -->

  </div>
</template>

<script>
import Response from './Response'
import Map from './Map'
import Footer from '../../common/footer.vue'
import Hello from './hello.vue'
let storage = window.localStorage
export default {
  components: {Map, Response,Footer, Hello},
  name: 'HelloWorld',
  data () {
    return {
      msg: 'msg test.',
      type: storage['type'],
      currentDate: new Date(),
      newsArray: []
    }
  },
  mounted () {
    this.$axios({
      method: 'get',
      url: 'http://116.62.228.138:10003/news/articleGetAll'
    }).then((res) => {
      // console.log(newsArray)
      console.log(res.data.data)
      // var result = res.data
      this.newsArray = res.data.data
      console.log(this.newsArray)
      // console.log(storage)
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2, p{
  font-weight: normal;
  font-family: Arial, Helvetica, sans-serif;
  color: #f7f8f8;
}
a {
  color: #f7fdfb;
}
.mainPage {
  /* border: 1px solid #f7f8f8; */
  text-align: center;
}
.tableTitle {
    position: relative;
    margin: 0 auto;
    width: 100%;
    height: 1px;
    background-color: #d4d4d4;
    text-align: center;
    font-size: 16px;
    color: rgba(101, 101, 101, 1);
  }
 .midText {
    position: absolute;
    left: 50%;
    background-color: #ffffff;
    padding: 0 15px;
    transform: translateX(-50%) translateY(-50%);
  }

  .el-header {
    /* background-color: #0f2027; */
    background-color: #333;
    color: #333;
    text-align: center;
    /* line-height: 60px; */
  }
  .el-footer {
    /* background-color: #2c5364; */
    background-color: #333;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  .el-main {
    background-color: #333;
    color: #333;
    text-align: center;
  }
  body > .el-container {
    margin-bottom: 40px;
  }
  .el-card{
    background: #989898;
    width: 300px;
    display: inline-block;
    margin: 0.3em;
    border-radius: 20px;
  }
  .row-footer{
    font-weight: normal;
    font-family: Arial, Helvetica, sans-serif;
    color: #f8f7f7;
  }
  .row-header {
    margin-top: 10px;
    box-shadow: 0 2px 4px rgba(101, 101, 101, 101.12), 0 0 6px rgba(101, 101, 101, 0.04);
  }
  .time {
    font-size: 13px;
    color: #999;
  }

  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }
  .button {
    padding: 0;
    float: none;
    color: #000;
    /* text-decoration: underline; */
  }

  .image {
    width: 100%;
    height:200px;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }

  .clearfix:after {
      clear: both
  }
  .article-title{
      font-family: -apple-system,
      BlinkMacSystemFont,
      "Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol";
      font-size: 1rem;
      font-weight: 400;
      line-height: 1.5;
      color: #212529;
      text-align: left;
  }
  .asset-title-date {
    font-family: robotomedium;
    font-style: italic;
    color: #a6a6a6;
    font-size: 14px;
    text-transform: uppercase;
  }
  .portlet-asset-publisher h3.asset-title {
    margin-top: 10px;
    border-bottom: 0;
    line-height: 20px;
    font-family: robotolight;
    font-size: 40px;
  }
  .footer .fri-link select {
    width: 250px;
    height: 30px;
    line-height: 30px;
    font-size: 14px;
    color: #909090;
    border: none;
    padding-left: 8px;
    margin-top: -28px;
    /* background: url(../images/xl2.png) no-repeat 220px 12px; */
    background-color: #fff;
  }

  .logo img{
    width: 100%;
    vertical-align: middle;
    outline: none;
    border: 0;
  }
  .contact{
    /* margin-right: 20px; */
    border-right:1px solid #ddd;
  }
</style>
