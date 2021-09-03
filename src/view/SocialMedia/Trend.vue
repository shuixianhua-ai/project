<template>
  <div id="app">
    <el-row>
      <el-col :span="8">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span class="mediaName">EHA News</span>
            <el-avatar
              style="float: right"
              src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
            ></el-avatar>
          </div>
          <span
            >In the Indonesian province of North Sumatra, 3 people died and 9
            went missing due to landslides caused by excessive rains. The search
            continues for 9 people under the ground.</span
          >
          <img
            src="https://media.pri.org/s3fs-public/styles/story_main/public/photos/2014-December/indonesia_landslide_dec_12.jpg?itok=q7K-smm2"
            class="image"
          />
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span class="mediaName">EHA News</span>
            <el-avatar
              style="float: right"
              src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
            ></el-avatar>
          </div>
          <span
            >In the Indonesian province of North Sumatra, 3 people died and 9
            went missing due to landslides caused by excessive rains. The search
            continues for 9 people under the ground.</span
          >
          <img
            src="https://media.pri.org/s3fs-public/styles/story_main/public/photos/2014-December/indonesia_landslide_dec_12.jpg?itok=q7K-smm2"
            class="image"
          />
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span class="mediaName">EHA News</span>
            <el-avatar
              style="float: right"
              src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
            ></el-avatar>
          </div>
          <span
            >In the Indonesian province of North Sumatra, 3 people died and 9
            went missing due to landslides caused by excessive rains. The search
            continues for 9 people under the ground.</span
          >
          <img
            src="https://media.pri.org/s3fs-public/styles/story_main/public/photos/2014-December/indonesia_landslide_dec_12.jpg?itok=q7K-smm2"
            class="image"
          />
        </el-card>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="8">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span class="mediaName">EHA News</span>
            <el-avatar
              style="float: right"
              src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
            ></el-avatar>
          </div>
          <span
            >In the Indonesian province of North Sumatra, 3 people died and 9
            went missing due to landslides caused by excessive rains. The search
            continues for 9 people under the ground.</span
          >
          <img
            src="https://media.pri.org/s3fs-public/styles/story_main/public/photos/2014-December/indonesia_landslide_dec_12.jpg?itok=q7K-smm2"
            class="image"
          />
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span class="mediaName">EHA News</span>
            <el-avatar
              style="float: right"
              src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
            ></el-avatar>
          </div>
          <span
            >In the Indonesian province of North Sumatra, 3 people died and 9
            went missing due to landslides caused by excessive rains. The search
            continues for 9 people under the ground.</span
          >
          <img
            src="https://media.pri.org/s3fs-public/styles/story_main/public/photos/2014-December/indonesia_landslide_dec_12.jpg?itok=q7K-smm2"
            class="image"
          />
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span class="mediaName">EHA News</span>
            <el-avatar
              style="float: right"
              src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
            ></el-avatar>
          </div>
          <span
            >In the Indonesian province of North Sumatra, 3 people died and 9
            went missing due to landslides caused by excessive rains. The search
            continues for 9 people under the ground.</span
          >
          <img
            src="https://media.pri.org/s3fs-public/styles/story_main/public/photos/2014-December/indonesia_landslide_dec_12.jpg?itok=q7K-smm2"
            class="image"
          />
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
};
</script>

<style lang="less">
#app {
  font-family: Arial, "Avenir", Helvetica, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color:  #353535;
  width: 100%;
  height: 100%;
  margin-top: 15px;
}

.el-row {
  margin-left: 20px;
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}

.text {
  font-size: 14px;
}

.mediaName {
  font-size: 16px;
  color: #000;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 90%;
}

.image {
  width: 100%;
  height: 100%;
}
</style>
