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
      <el-collapse-item title="Selected by Spatial Resolution" name="2">
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
        :span="11"
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
          <div class="infodisplay" style="padding: 10px">
            <el-collapse v-model="activeNames" @change="handleChange">
              <el-collapse-item class="subcollapse">
                <template slot="title">
                  <div style="font-size: 16px">
                    <button class="button_info"></button> {{ img.name }}
                  </div>
                </template>
                <div
                  class="bottom clearfix"
                  style="font-size: 14px; color: #ffffff"
                >
                  <i class="el-icon-caret-right"></i> {{ img.sensor }}<br />
                  <i class="el-icon-caret-right"></i> {{ img.resolution }}<br />
                  <i class="el-icon-caret-right"></i> {{ img.satellite }}<br />
                  <i class="el-icon-caret-right"></i>
                  {{ img.date.substr(0, 10) }}
                  <el-button
                    class="locate"
                    type="info"
                    size="mini"
                    icon="el-icon-location"
                    v-on:click="sendLocFlag(img.id)"
                    plain
                    circle
                  ></el-button>
                </div>
              </el-collapse-item>
            </el-collapse>
            <div style="margin: 10px 0"></div>
            <el-button
              size="mini"
              type="info"
              icon="el-icon-view"
              circle
              plain
              v-on:click="sendImgFlag(img.id)"
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
              v-on:click="sendBoxFlag(img.id)"
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

import filterTime2 from "./Filter-image-time.vue";
import bus from "./eventBus";

export default {
  name: "filterOfPictures",
  data() {
    return {
      CollapseActiveNames: [],
      selectionContent1: [], //sensor
      selectionContent2: [], //resolution
      selectionContent3: [], //satellite
      selectionTime: [], //time
      imgList: [
        //resolution 1-5分别对应very low,low,medium,high,very high
        {
          id: 0,
          name: "img1",
          sensor: "Optical",
          resolution: "Medium",
          satellite: "LANDSAT7",
          date: "2019-12-29,13:00:54",
          imgDisplay: false,
          boundingBox: false,
          isdisplay: false,
        },
        {
          id: 1,
          name: "img2",
          sensor: "Optical",
          resolution: "Medium",
          satellite: "GF",
          date: "2020-01-01,01:00:03",
          imgDisplay: false,
          boundingBox: false,
          isdisplay: false,
        },
        {
          id: 2,
          name: "img3",
          sensor: "Radar",
          resolution: "Low",
          satellite: "LANDSAT8",
          date: "2020-01-08,17:09:56",
          imgDisplay: false,
          boundingBox: false,
          isdisplay: false,
        },
        {
          id: 3,
          name: "img4",
          sensor: "Optical",
          resolution: "Very Low",
          satellite: "SENTINEL_1A",
          date: "2020-01-13,00:08:48",
          imgDisplay: false,
          boundingBox: false,
          isdisplay: false,
        },
        {
          id: 4,
          name: "img5",
          sensor: "Radar",
          resolution: "Very High",
          satellite: "TANDEM_X",
          date: "2020-01-20,12:00:00",
          imgDisplay: false,
          boundingBox: false,
          isdisplay: false,
        },
      ],
      SensorOptions: ["Optical", "Radar"],
      ResolutionOptions: ["Very High", "High", "Medium", "Low", "Very Low"],
      SatelliteOptions: [
        "CBERS4",
        "GEO_EYE_1",
        "KANOPUS_V",
        "KANOPUS_V_IK",
        "KOMPSAT5",
        "LANDSAT7",
        "LANDSAT8",
        "METEOSAT_11",
        "RCM-1",
        "RCM-2",
        "RCM-3",
        "RESOURCESAT_2A",
        "Saocom 1A",
        "SENTINEL_1A",
        "SENTINEL_1B",
        "SENTINEL_2B",
        "TANDEM_X",
        "TERRASAR_X",
        "WORLDVIEW_2",
        "WORLDVIEW_3",
        "GF",
        "FY",
        "ZY",
        "HY",
        "HJ",
      ],
    };
  },
  methods: {
    // 对 imgList 添加影像列表
    init() {
      axios({
        url: "http://116.62.228.138:10003/images/GetImages", // 获取所有Disaster_response
        method: "get",
      }).then((res) => {
        var len = res.data.data.length;
        var img_data = res.data.data;
        //
        // img_data = img_data.filter((item) => item.geoJson != null);

        // let totalNum = 0;
        // for (var i = len - 1; i >= 0; i--) {
        //   this.DisasterList.push({
        //     id: ++totalNum, // 在项目中的disaster-id，从1起始
        //     did: dis_data[i].did, // 原始 disaster-id
        //     name: dis_data[i].name,
        //     type: dis_data[i].tag,
        //     country: dis_data[i].country,
        //     location: [dis_data[i].lon, dis_data[i].lat],
        //     date: dis_data[i].startTime,
        //     description: dis_data[i].description,
        //     sponsor: dis_data[i].sponsor,
        //     responsor: dis_data[i].responsor,
        //     geojson: dis_data[i].aoijson,
        //     isdisplay_type: true,
        //     isdisplay_time: true,
        //     isdisplay_country: true,
        //     isdisplay: true,
        //   });
        //   console.log(dis_data[i].did);
        // }
        // this.DisasterList.sort(compare("id"));
      });
    },
    sendImgFlag(id) {
      // 切换地图上相应img的可见性
      this.imgList[id].imgDisplay = !this.imgList[id].imgDisplay;
      bus.$emit("MainpageImg", id, this.imgList[id].imgDisplay, this.imgList);
    },
    sendBoxFlag(id) {
      // 切换地图上相应影像包围盒的可见性
      this.imgList[id].boundingBox = !this.imgList[id].boundingBox;
      bus.$emit("MainpageBox", this.imgList);
    },
    sendLocFlag(id) {
      bus.$emit("MainpageLoc", id);
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
        if (this.selectionTime2.length > 0) {
          var year = this.imgList[i].date.substr(0, 4);
          var month = this.imgList[i].date.substr(5, 2);
          var date = this.imgList[i].date.substr(8, 2);
          var hour = this.imgList[i].date.substr(11, 2);
          var min = this.imgList[i].date.substr(14, 2);
          var s = this.imgList[i].date.substr(17, 2);
          var datanumber = new Date(
            Date.UTC(year, month - 1, date, hour, min, s)
          );
          //console.log(min);
          console.log(this.selectionTime2);

          if (
            datanumber <=
              Math.max(this.selectionTime2[0], this.selectionTime2[1]) &&
            datanumber >=
              Math.min(this.selectionTime2[0], this.selectionTime2[1])
          ) {
            f4 = 1;
          }
        } else f4 = 1;

        if (f1 == 1 && f2 == 1 && f3 == 1 && f4 == 1)
          this.imgList[i].isdisplay = true;
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
.infodisplay {
  font-family: Arial, Helvetica, sans-serif;
  color: #ffffff;
  text-align: left;
}
.button_info {
  /* display: inline; */
  border: none;
  height: 13px;
  width: 13px;
  background-image: url(../assets/icon/button_info.png);
  background-repeat: no-repeat;
  background-size: 13px 13px;
}
.subcollapse >>> .el-collapse-item__header {
  height: 24px;
}
.subcollapse >>> .el-collapse-item__content {
  padding-bottom: 5px;
}
/* 卡片样式更改 */
.el-card {
  border: 1px solid #ababab;
  background-color: #2d2d2d;
  color: #ffffff;
}
.el-collapse {
  border-top: 1px solid #ababab;
  border-bottom: 1px solid #ababab;
}
</style>
