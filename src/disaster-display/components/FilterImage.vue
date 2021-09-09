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
      <el-button round @click="queryInfoClick">Submit</el-button>
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
          <img height="90px" :src="'api/preview?id=' + img.mid" class="image" />
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
              @click="downloadClick(img.isdownload, img.mid)"
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

    <el-dialog :visible.sync="dialogVisible" width="25%">
      <div style="margin: 5px 0"></div>
      <el-tabs type="border-card">
        Please select a <strong>ACTIVATION OF DISASTER</strong> to search for
        images!<br />
        <br />
        (Default - Activation 1)</el-tabs
      >
    </el-dialog>

    <el-dialog :visible.sync="dialogVisible2" width="22.5%">
      <div style="margin: 5px 0"></div>
      <el-tabs type="border-card">
        <strong>NOTICE</strong><br /><br />
        This image has <strong>not been downloaded </strong>to the server yet.
        <br />Now begins to download...
      </el-tabs>
    </el-dialog>
  </div>
</template>

<script>
import filterModel from "./FilterModel";

import filterTime2 from "./Filter-image-time.vue";
import bus from "./eventBus";
import axios from "axios";

export default {
  name: "filterOfPictures",
  data() {
    return {
      CollapseActiveNames: [],
      selectionContent1: [], //sensor
      selectionContent2: [], //resolution
      selectionContent3: [], //satellite
      selectionTime: [], //time
      focusDisaster: 0, //当前页面关注的灾害id
      disasterdate: "2020-01-01 01:00:03",
      dialogVisible: false,
      dialogVisible2: false,
      imgList: [],
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
  mounted() {
    this.init();
    var self = this;
    bus.$on("ImageOfDisaster", function (did, date) {
      self.focusDisaster = did;
      self.disasterdate = date;
    });
  },
  methods: {
    /* 对 imgList 添加影像列表 */
    init() {
      axios({
        url: "http://116.62.228.138:10003/images/GetImages", // 获取所有image
        method: "get",
      }).then((res) => {
        var len = res.data.data.length;
        var img_data = res.data.data;

        img_data = img_data.filter((item) => item.geoJson != null);
        let totalNum = 0;

        for (let i = 0; i < len; i++) {
          // 对数据库内属性进行转换

          // 分辨率
          let temp_resolution;
          if (img_data[i].resolution <= 1) {
            temp_resolution = "Very High";
          } else if (img_data[i].resolution <= 10) {
            temp_resolution = "High";
          } else if (img_datat[i].resolution <= 50) {
            temp_resolution = "Medium";
          } else if (img_data[i].resolution <= 100) temp_resolution = "Low";
          else temp_resolution = "Very Low";

          // 传感器
          let temp_sensor;
          if (img_data[i].platformName == "Sentinel-2") {
            temp_sensor = "Optical";
          } else {
            temp_satellite = "Radar";
          }

          // 卫星
          let temp_satellite;
          if (img_data[i].platformName == "Sentinel-2") {
            temp_satellite = "SENTINEL_2B";
          } else {
            temp_satellite = "Unknown";
          }

          // 时间
          let temp_date;
          temp_date = img_data[i].date.toString().substr(0, 19);

          // 包围盒
          let geoText = JSON.stringify(img_data[i].geoJson);
          let geoText2 = JSON.parse(geoText);
          let geoJson = eval("(" + geoText2 + ")");
          let geo = geoJson.coordinates[0];

          // 将数据库内的影像添加至imgList
          this.imgList.push({
            id: ++totalNum, // id从1开始
            name: "img" + totalNum,
            mid: img_data[i].mid,
            did: img_data[i].did,
            sensor: temp_sensor,
            satellite: temp_satellite,
            resolution: temp_resolution,
            date: temp_date,
            boxgeo: geo, // 包围盒
            imgDisplay: false, // 是否在地图上显示影像
            boundingBox: false, // 是否在地图上显示包围盒
            isdownload: img_data[i].downloadState, // 是否已下载至服务器
            isdisplay: false, //是否在过滤查询后显示
          });
        }
        //this.imgList.sort(compare("id")); //  按id排序
      });
    },
    sendImgFlag(id) {
      /* 切换地图上相应img的可见性 */
      this.imgList[id - 1].imgDisplay = !this.imgList[id - 1].imgDisplay;
      bus.$emit("MainpageImg", id, this.imgList);
    },
    sendBoxFlag(id) {
      /* 切换地图上相应影像包围盒的可见性 */
      this.imgList[id - 1].boundingBox = !this.imgList[id - 1].boundingBox;
      bus.$emit("MainpageBox", this.imgList);
    },
    sendLocFlag(id) {
      /* 地图以所选影像为中心*/
      let boxgeo = this.imgList[id - 1].boxgeo;
      bus.$emit("MainpageLoc", boxgeo, id);
    },
    handleChange(val) {},

    downloadClick(downloadState, mid) {
      /* 下载所选影像 */
      var link = document.createElement("a");
      link.download = "image";

      // 影像未下载至服务器时 - 请求将该影像下载至服务器
      if (downloadState == "not downloaded") {
        link.href = "http://116.62.228.138:10003/download?id=" + mid;
        window.open(link.href, "_blank");
        this.dialogVisible2 = true; // 跳出弹窗提示
      }
      // 影像已下载至服务器时 - 将影像下载至本地
      else {
        link.href = "http://116.62.228.138:10003/file/downloadfile?id=" + mid;
        link.click();
        link.remove();
      }
      //mid = "54d5ed36-b564-44be-bc75-9b65f3b2938d";
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
    //获取时间过滤中滑动条的范围
    getSelectionTime2(selection) {
      this.selectionTime2 = selection;
      //console.log(this.selectionTime2);
    },
    queryInfoClear() {
      for (var i = 0; i < this.imgList.length; i++)
        this.imgList[i].isdisplay = false;
      this.$refs.filtermodel1.handleCheckAllChange(false);
      this.$refs.filtermodel2.handleCheckAllChange(false);
      this.$refs.filtermodel3.handleCheckAllChange(false);
    },
    queryInfoClick() {
      if (this.focusDisaster == 0) {
        this.dialogVisible = true;
        this.focusDisaster = 1;
      }

      for (var i = 0; i < this.imgList.length; i++) {
        var f1 = 0;
        var f2 = 0;
        var f3 = 0;
        var f4 = 0;
        var f5 = 0;

        // 过滤传感器类型为所选条件
        if (this.selectionContent1.length > 0) {
          for (var j = 0; j < this.selectionContent1.length; j++) {
            if (this.imgList[i].sensor == this.selectionContent1[j]) {
              f1 = 1;
              break;
            }
          }
        } else f1 = 1;

        // 过滤分辨率为所选条件
        if (this.selectionContent2.length > 0) {
          for (var j = 0; j < this.selectionContent2.length; j++) {
            if (this.imgList[i].resolution == this.selectionContent2[j]) {
              f2 = 1;
              break;
            }
          }
        } else f2 = 1;

        // 过滤卫星类型为所选条件
        if (this.selectionContent3.length > 0) {
          for (var j = 0; j < this.selectionContent3.length; j++) {
            if (this.imgList[i].satellite == this.selectionContent3[j]) {
              f3 = 1;
              break;
            }
          }
        } else f3 = 1;

        // 过滤拍摄时间为所选时间区间
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

          if (
            datanumber <=
              Math.max(this.selectionTime2[0], this.selectionTime2[1]) &&
            datanumber >=
              Math.min(this.selectionTime2[0], this.selectionTime2[1])
          ) {
            f4 = 1;
          }
        } 
        else f4 = 1;

        // 过滤当前所选灾害的相关影像
        if (this.imgList[i].did == this.focusDisaster) {
          f5 = 1;
        }

        if (f1 == 1 && f2 == 1 && f3 == 1 && f4 == 1 && f5 == 1)
          this.imgList[i].isdisplay = true;
        else this.imgList[i].isdisplay = false;
      }
    },
  },
  components: {
    filterModel: filterModel,
    filterTime2: filterTime2,
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
  position: relative;
  bottom: 5px;
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
