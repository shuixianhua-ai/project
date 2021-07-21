<template>
  <div class="tags">
    <el-collapse v-model="CollapseActiveNames" @change="handleChange">
      <el-collapse-item title="Selected by Sensors" name="1">
        <filterModel :Options="SensorOptions"></filterModel>
      </el-collapse-item>
      <el-collapse-item title="Selected by Resolution" name="2">
        <filterModel :Options="ResolutionOptions"></filterModel>
      </el-collapse-item>
      <el-collapse-item title="Selected by Satellite" name="3">
        <filterModel
          :Options="SatelliteOptions"
          @filterSelection="getSelection"
        >
        </filterModel>
      </el-collapse-item>
    </el-collapse>
    <div style="margin: 15px 0"></div>
    <div>
      <el-button round @click="queryInfoClick"> Summit </el-button>
    </div>
    <div style="margin: 15px 0"></div>
    <el-row>
      <el-col
        :span="8"
        v-for="(img, index) in imgList"
        :key="index"
        :offset="2"
        v-show="img.isdisplay"
      >
        <el-card :body-style="{ padding: '5px' }">
          <img
            height="70px"
            :src="require('../assets/raster/' + img.name + '.jpg')"
            class="image"
          />
          <div style="padding: 14px">
            {{ img.name }}
            <div class="bottom clearfix">{{ img.satellite }}</div>
            <div style="margin: 15px 0"></div>
            <el-button
              size="mini"
              type="info"
              icon="el-icon-view"
              circle
              plain
            ></el-button>
            <el-button
              size="mini"
              type="info"
              icon="el-icon-download"
              circle
              @click="downloadClick(img.name)"
              plain
            ></el-button>
          </div>
        </el-card>
        <div style="margin: 15px 0"></div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import filterModel from "./FilterModel";

export default {
  name: "filterOfPictures",
  data() {
    return {
      CollapseActiveNames: [],
      selectionContent: [],
      imgList: [
        {
          name: "img1",
          satellite: "LANDSAT",
          isdisplay: false,
        },
        {
          name: "img2",
          satellite: "GF",
          isdisplay: false,
        },
        {
          name: "img3",
          satellite: "TENDEM",
          isdisplay: false,
        },
        {
          name: "img4",
          satellite: "SENTINEL",
          isdisplay: false,
        },
        {
          name: "img5",
          satellite: "GF",
          isdisplay: false,
        },
      ],
      SensorOptions: ["Optical", "Radar"],
      ResolutionOptions: ["Very High", "High", "Medium", "Low", "Very Low"],
      SatelliteOptions: ["LANDSAT", "GF", "SENTINEL", "TENDEM"],
    };
  },
  methods: {
    handleChange(val) {
      console.log(val);
    },
    downloadClick(value) {
      //img下载
      var link = document.createElement("a");
      link.download = value;
      link.href = require("../assets/raster/" + value + ".jpg");
      link.click();
      link.remove();
    },
    getSelection(selection) {
      //目前仅针对satellite的filter
      this.selectionContent = selection;
    },
    queryInfoClick() {
      for (var i = 0; i < this.imgList.length; i++) {
        for (var j = 0; j < this.selectionContent.length; j++) {
          if (this.imgList[i].satellite == this.selectionContent[j]) {
            this.imgList[i].isdisplay = true;
            break;
          } else this.imgList[i].isdisplay = false;
        }
      }
      //测试
      // this.$alert(this.imgList[0], 'selection', {
      //     confirmButtonText: '确定',
      //     callback: action => {
      //       this.$message({
      //         type: 'info',
      //         message: `action: ${ action }`
      //       });
      //     }
      //   });
    },
  },
  components: {
    filterModel: filterModel,
  },
};
</script>

<style scoped>
.image {
  width: 100%;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}
</style>
