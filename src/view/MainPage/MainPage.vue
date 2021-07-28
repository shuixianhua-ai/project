<template>
  <div class="mainPage">

    <div><h1></h1></div>
   <Map></Map>
  <!-- <div>
    <h2>content</h2>
    <h2>content</h2>
    <h2>content</h2>
    <h2>content</h2>
  </div> -->
  <el-container>

      <!-- Disasters -->
      <el-header>
        <el-row class="row-header" type="flex" justify="center">
          <el-col :span="20">
            <h1>Type of Disasters</h1>
          </el-col>
        </el-row>
      </el-header>

      <el-main>
        <el-row  type="flex" justify="center">
          <el-col :span="20">
            <el-card class="box-card" shadow="never" v-for="(item,index) in TypeOfDisasters" :key="index">
              <h2>{{index+1}}</h2>
              <h2>{{item}}</h2>
              <el-botton size="small" type="text">View details >></el-botton>
            </el-card>
          </el-col>
        </el-row>
      </el-main>

      <!-- News -->
      <el-header>
        <el-row class="row-header" type="flex" justify="center">
          <el-col :span="20">
            <h1>Latest News</h1>
          </el-col>
        </el-row>
      </el-header>

      <el-main>
        <el-row  type="flex" justify="center">
          <el-col :span="20">
            <el-card class="box-card" shadow="never" v-for="(item,index) in LatestNews" :key="index">
              <h2>{{index+1}}</h2>
              <h2>{{item}}</h2>
              <el-botton size="small" type="text">View details >></el-botton>
            </el-card>
          </el-col>
        </el-row>
      </el-main>

      <el-footer>
        <el-row class="row-footer" type="flex" justify="center">
          <el-col :span="20">
            <h1>{{Footer}}</h1>
          </el-col>
        </el-row>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
import Map from './Map'
export default {
  components: {Map},
  name: 'HelloWorld',
  data () {
    return {
      headings: [
        '1heading',
        '2heading',
        '3heading',
        '4heading',
        '5heading',
        '6heading'
      ],
      TypeOfDisasters: [
        'Earthquake',
        'Flood',
        'Volcano',
        'Landslides',
        'Hurricane',
        'tsunami'
      ],
      LatestNews: [
        '1',
        '2',
        '3',
        '4',
        '5',
        '6'
      ],
      Footer: 'Contact Us:xxx'
    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
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
    background-color: #0f2027;
    color: #333;
    text-align: center;
    /* line-height: 60px; */
  }
  .el-footer {
    background-color: #2c5364;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  .el-main {
    background-color: #203a43;
    color: #333;
    text-align: center;
    /* line-height: 160px; */
  }
  body > .el-container {
    margin-bottom: 40px;
  }
  .el-card{
    background: #1f1e33;
    width: 300px;
    display: inline-block;
    margin: 0.3em;
    border-radius: 20px;
  }
  .row-footer{
    font-weight: normal;
    font-family: Arial, Helvetica, sans-serif;
    /* color: #f8f7f7; */
  }

</style>
