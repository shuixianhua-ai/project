<template>
<footer :class="{footerSticky:footer_fixed}">
  <el-row class="row-footer" type="flex" justify="center">

    <el-col :span="4">
      <div class="logo">
        <img src="../assets/pictures/MainPage-img/浙大logo.png">
    </div>
    </el-col>

      <el-col :span="12">
      <div class="contact">
          <h2>Contact Us</h2>
              <p><b>Address:</b> School of Earth Sciences, Zhejiang University, No. 38, Zheda Road</p>
              <p><b>Post code:</b> 310027</p>
              <p><b>Tel:</b> + 86-571-87952453</p>
      </div>
    </el-col>

    <el-col :span="8">
      <br/><br><br/><br>
      <div class="fri-link" style="position: relative">
          <select onchange="window.open(this.options[this.selectedIndex].value,target='_blank')">
              <option>Friendly Link</option>
                  <option value="http://www.zju.edu.cn/">Zhejiang University</option>                    
                  <option value="https://www.nodc.noaa.gov/">National Centers for Environmental Infomation</option>
                  <option value="https://disasterscharter.org/web/guest/home">The International Charter Space and Major Disasters</option>
                  
          </select>
      </div>
    </el-col>

</el-row>
</footer>
</template>
<script>


export default {
  name: 'Footer',
  }
</script>

<style scoped>
.footerSticky {
  padding: 5px 70px;
  /* background: #fff; */
}
.row-footer{
  font-weight: normal;
  font-family: Arial, Helvetica, sans-serif;
  background: #f8f7f7;
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
      .logo{
        /* margin-right: 20px; */
        border: none;
        padding-top: 6.8px;
      }
      .logo img{
        height: 160px;
        width: auto;
        vertical-align: middle;
        outline: none;
        border: 0;
        position: relative;
      }
      .contact{
        /* margin-right: 20px; */
        border-right:1px solid #000;
      }
      .contact h2,p{
        color: #000;
      }
</style>