<template>
  <div class="tags">
    <el-collapse v-model="CollapseActiveNames" @change="handleChange">
      <el-collapse-item title="Selected by Sensors" name="1">
        <filterModel
          :Options="SensorOptions"
          @filterSelection="getSelection1"
          ref="filtermodel1"
        ></filterModel>
      </el-collapse-item>
      <el-collapse-item title="Selected by Resolution" name="2">
        <filterModel
          :Options="ResolutionOptions"
          @filterSelection="getSelection2"
          ref="filtermodel2"
        ></filterModel>
      </el-collapse-item>
      <el-collapse-item title="Selected by Satellite" name="3">
        <filterModel
          :Options="SatelliteOptions"
          @filterSelection="getSelection3"
          ref="filtermodel3"
        >
        </filterModel>
      </el-collapse-item>
      <el-collapse-item title="Selected by Time" name="4">
        <filterTime2 @filterSelectionTime2="getSelectionTime2" />
      </el-collapse-item>
    </el-collapse>
    <div style="margin: 15px 0"></div>
    <div>
      <el-button round @click="queryInfoClick">Summit</el-button>
      <el-button round @click="queryInfoClear">Clear Results</el-button>
    </div>
    <div style="margin: 15px 0"></div>
    <el-row>
      <el-col
        :span="10"
        v-for="(img, index) in imgList"
        :key="index"
        :offset="1"
        v-show="img.isdisplay"
      >
        <el-card :body-style="{ padding: '5px' }">
          <img
            height="90px"
            :src="require('../assets/raster/' + img.name + '.jpg')"
            class="image"
          />
          <div style="padding: 10px">
            {{ img.name }}
            <div class="bottom clearfix">{{ img.satellite }}</div>
            <div style="margin: 10px 0"></div>
            <el-button
              size="mini"
              type="info"
              icon="el-icon-view"
              circle
              plain
              v-on:click="sendFlag"
            ></el-button>
            <el-button
              size="mini"
              type="info"
              icon="el-icon-download"
              circle
              @click="downloadClick(img.name)"
              plain
            ></el-button>
            <el-button
              size="mini"
              type="info"
              icon="el-icon-full-screen"
              circle
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
import bus from "./eventBus";
import filterTime2 from "./Filter-disaster-time-2.vue";

export default {
  name: "filterOfPictures",
  data() {
    return {
      imgFlag: false,
      CollapseActiveNames: [],
      selectionContent1: [], //sensor
      selectionContent2: [], //resolution
      selectionContent3: [], //satellite
      selectionTime: [], //time
      imgList: [
        //resolution 1-5分别对应very low,low,medium,high,very high
        {
          id: "1",
          name: "img1",
          sensor: "Optical",
          resolution: "Medium",
          satellite: "LANDSAT",
          date:"2020-01-20",
          isdisplay: false,
        },
        {
          id: "2",
          name: "img2",
          sensor: "Optical",
          resolution: "Medium",
          satellite: "GF",
          date:"2019-12-29",
          isdisplay: false,
        },
        {
          id: "3",
          name: "img3",
          sensor: "Radar",
          resolution: "Low",
          satellite: "KOMPSAT",
          date:"2020-01-08",
          isdisplay: false,
        },
        {
          id: "4",
          name: "img4",
          sensor: "Optical",
          resolution: "Very Low",
          satellite: "SENTINEL",
          date:"2020-01-13",
          isdisplay: false,
        },
        {
          id: "5",
          name: "img5",
          sensor: "Radar",
          resolution: "Very High",
          satellite: "TENDEM",
          date:"2020-01-01",
          isdisplay: false,
        },
      ],
      SensorOptions: ["Optical", "Radar"],
      ResolutionOptions: ["Very High", "High", "Medium", "Low", "Very Low"],
      SatelliteOptions: ["LANDSAT", "GF", "SENTINEL", "TENDEM"],
    };
  },
  methods: {
    sendFlag() {
      this.imgFlag = !this.imgFlag;
      bus.$emit("MainpageFlag", this.imgFlag);
    },
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
    getSelection1(selection) {
      this.selectionContent1 = selection;
    },
    getSelection2(selection) {
      this.selectionContent2 = selection;
    },
    getSelection3(selection) {
      //目前仅针对satellite的filter
      this.selectionContent3 = selection;
    },
    getSelectionTime2(selection) {
      this.selectionTime2 = selection;
    },
    queryInfoClear() {
      for (var i = 0; i < this.imgList.length; i++)
        this.imgList[i].isdisplay = false;
      this.$refs.filtermodel1.handleCheckAllChange(false);
      this.$refs.filtermodel2.handleCheckAllChange(false);
      this.$refs.filtermodel3.handleCheckAllChange(false);
    },
    queryInfoClick() {
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
      // if(this.selectionContent1){
      //   for(var i = 0; i < this.imgList.length; i++){
      //       if(this.imgList[i].isflag==false) break;
      //       for(var j = 0;j < this.selectionContent1.length;j++){
      //         if(this.imgList[i].sensor == this.selectionContent1[j]){
      //           this.imgList[i].isdisplay=true;
      //           break;
      //         }
      //         else this.imgList[i].isdisplay=false;
      //       }
      //       if(this.imgList[i].isflag && this.imgList[i].isdisplay==false)
      //         this.imgList[i].isflag=false;
      //     }
      // }
      for (var i = 0; i < this.imgList.length; i++) {
        var f1 = 0;
        var f2 = 0;
        var f3 = 0;
        var f4 = 0;
        if (this.selectionContent1.length > 0) {
          for (var j = 0; j < this.selectionContent1.length; j++) {
            if (this.imgList[i].sensor == this.selectionContent1[j]) {
              f1 = 1;
              break;
            }
          }
        } else f1 = 1;
        if (this.selectionContent2.length > 0) {
          for (var j = 0; j < this.selectionContent2.length; j++) {
            if (this.imgList[i].resolution == this.selectionContent2[j]) {
              f2 = 1;
              break;
            }
          }
        } else f2 = 1;
        if (this.selectionContent3.length > 0) {
          console.log(this.selectionContent3.length);
          for (var j = 0; j < this.selectionContent3.length; j++) {
            if (this.imgList[i].satellite == this.selectionContent3[j]) {
              f3 = 1;
              break;
            }
          }
        } else f3 = 1;

        //按时间过滤
      if(this.selectionTime2.length>0)
      {
        var year = this.imgList[i].date.substr(0, 4);
        var month = this.imgList[i].date.substr(5, 2);
        var date = this.imgList[i].date.substr(8, 2);
        var datanumber = new Date(Date.UTC(year,month-1,date));
        console.log(date);
        console.log(this.selectionTime2);

        if (
          datanumber <=
            Math.max(this.selectionTime2[0], this.selectionTime2[1]) &&
          datanumber >= Math.min(this.selectionTime2[0], this.selectionTime2[1])
        ) {
          f4=1;
        } 
        
      }
      else f4=1;
        
          
        

        
      
        if (f1 == 1 && f2 == 1 && f3 == 1 && f4==1) this.imgList[i].isdisplay = true;
        else this.imgList[i].isdisplay = false;
      }
    },
  },
  components: {
    filterModel: filterModel,
    filterTime2: filterTime2,
    // FilterModel,
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
