<template>
  <div class="selectFrame">
    <div class="map-overlay top" position="top-right">
      <div class="map-overlay-inner">
        <fieldset>
          <!-- 显示当前所选的“灾害”名称 -->
          <label class="title">{{ msg }}</label>
          <label>Select Data to Download</label>
          <select id="layer" name="layer">
            <option value="dem">DEM Data</option>
            <option value="population">Population Data</option>
            <option value="osm">OSM Street Data</option>
            <option value="landcover">Land Cover Data</option>
          </select>
        </fieldset>
        <fieldset>
          <el-button
            size="mini"
            type="info"
            icon="el-icon-info"
            circle
            plain
            v-on:click="showdatainfo()"
          ></el-button>
          <el-button
            size="mini"
            type="info"
            icon="el-icon-download"
            circle
            plain
            v-on:click="downloadData()"
          ></el-button>
        </fieldset>
      </div>
    </div>
    <el-dialog :visible.sync="dialogVisible" width="55%">
      <div style="margin: 15px 0"></div>
      <el-tabs type="border-card">
        <el-row class="row1">
          <el-col :span="5" class="col1">Name:</el-col>
          <el-col :span="1">&ensp;&ensp;</el-col>
          <el-col :span="18" class="col2">{{
            this.dataList[checkeddataid].name
          }}</el-col>
        </el-row>
        <el-row class="row1">
          <el-col :span="5" class="col1">Type of Data:</el-col>
          <el-col :span="1">&ensp;&ensp;</el-col>
          <el-col :span="18" class="col2">{{
            this.dataList[checkeddataid].type
          }}</el-col>
        </el-row>
        <el-row class="row1">
          <el-col :span="5" class="col1">Spatial resolution:</el-col>
          <el-col :span="1">&ensp;&ensp;</el-col>
          <el-col :span="18" class="col2">{{
            this.dataList[checkeddataid].spatial_resolution
          }}</el-col>
        </el-row>
        <el-row class="row1">
          <el-col :span="5" class="col1">Source:</el-col>
          <el-col :span="1">&ensp;&ensp;</el-col>
          <el-col :span="18" class="col2">{{
            this.dataList[checkeddataid].source
          }}</el-col>
        </el-row>
        <el-row>
          <el-col :span="5" class="col1">Description:</el-col>
          <el-col :span="1">&ensp;&ensp;</el-col>
          <el-col :span="18" class="col2">{{
            this.dataList[checkeddataid].description
          }}</el-col>
        </el-row>
      </el-tabs>
    </el-dialog>
  </div>
</template>

<script>
import bus from "./eventBus";

/* “基础数据”的属性信息 */
const dataList = [
  {
    name: "DEM", // 基础数据名称
    type: "basic geographic data", // 数据类型
    spatial_resolution: "30m", // 数据空间分辨率
    source: // 数据源
      "JAXA: ALOS WORLD 30(https://www.eorc.jaxa.jp/ALOS/en/aw3d30/index.htm)",
    description: // 描述
      "This data set is a global digital surface model (DSM) with horizontal resolution of approximately 30 meters (basically 1 arcsecond) by the Panchromatic Remote-sensing Instrument for Stereo Mapping (PRISM), which was an optical sensor on board the Advanced Land Observing Satellite 'ALOS'. The latest version is 3.1 (southern area from 60 degrees south is ver. 1.0, and ver. 3.1 is coming soon). Any of the commercial and non-commercial purposes can be used free of charge under the conditions of the '5. Terms of Use' below. We hope that this dataset will be widely used in scientific research, education, and new services that use geospatial information.",
    
  },
  {
    name: "population data",
    type: "economic and social data",
    spatial_resolution: "100m",
    source:
      "Constrained Individual countries 2020 UN adjusted(https://www.worldpop.org/geodata/listing?id=79)",
    description:
      "WorldPop works to ensure that every person is mapped and counted in decision making.An understanding of the numbers, characteristics and locations of humanpopulations underpins operational work, policy analyses and scientific development globally across multiple sectors. However, traditional populationdata sources are often outdated, have low granularity and are updated on thescale of decades.New data sources and recent methodological advances madeby the WorldPop program now provide high resolution, open and contemporarydata on human population distributions, allowing accurate measurement of localpopulation distributions, compositions, characteristics, growth and dynamics,across national and regional scales.",
  },
  {
    name: "OSM",
    type: "basic geographic data",
    spatial_resolution: "--",
    source: "https://www.openstreetmap.org/",
    description:
      "OpenStreetMap (OSM for short, open map in Chinese) is an online map collaboration plan. The goal is to create a world map with free content and can be edited by everyone. OSM is a free, open source and editable map service jointly created by the Internet public. OpenStreetMap uses the collective strength and free contribution of the public to improve the geographic data related to the map. OSM is non-profit. It feeds back data to the community and reuse it for other products and services. Other maps sell most of the map data to third parties.",
  },
  {
    name: "LUCC",
    type: "industry thematic data",
    spatial_resolution: "30m",
    source: "GLC-FCS30(https://zenodo.org/record/4280923#.YJH_g_kzZPY)",
    description:
      "The new GLC_FCS30-2020 products were produced based on Global 30-m land-cover product with fine classification system in 2015 (GLC_FCS30-2015) and  combined with the 2019-2020 time series Landsat surface reflectance data, Sentinel-1 SAR data, DEM terrain elevation data, global thematic auxiliary dataset and prior knowledge dataset. ",
  },
];

export default {
  name: "selectFrame",
  data() {
    return {
      msg: "",
      checkeddataid: 0, // 勾选的数据类型id
      dialogVisible: false,
      dataList: dataList,
    };
  },
  mounted() {
    var self = this;
    /* 更新的灾害标题 */
    bus.$on("TitleOfDisaster", function (title, id) {
      self.msg = title;
    });
  },
  methods: {
    /* 切换下拉框选择的数据类型 */
    showdatainfo() {
      var item = document.getElementById("layer").value;
      if (item == "dem") {
        this.checkeddataid = 0;
      } else if (item == "population") {
        this.checkeddataid = 1;
      } else if (item == "osm") {
        this.checkeddataid = 2;
      } else {
        this.checkeddataid = 3;
      }
      this.dialogVisible = true;
    },

    /* 基础数据下载 */
    downloadData() {
      var item = document.getElementById("layer").value;
      var link = document.createElement("a");
      link.download = item + ".rar";
      link.href = "/static/Disaster-download/" + item + ".rar";
      link.click();
      link.remove();
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.map-overlay {
  font: 12px/20px "Helvetica Neue", Arial, Helvetica, sans-serif;
  position: absolute;
  width: 200px;
  top: 0;
  left: 0;
  padding: 10px;
  z-index: 600;
}

.map-overlay .map-overlay-inner {
  background-color: #2d2d2d;
  box-shadow: 0 1px 2px rgba(255, 255, 255, 0.9);
  color: #ffffff;
  border-radius: 3px;
  padding: 10px;
  margin-bottom: 10px;
}

.map-overlay-inner fieldset {
  border: none;
  padding: 0;
  margin: 0 0 10px;
}

.map-overlay-inner fieldset:last-child {
  margin: 0;
}

.map-overlay-inner select {
  width: 100%;
}

.map-overlay-inner label {
  display: block;
  font-weight: bold;
  margin: 5px 0 5px;
}

.map-overlay-inner button {
  display: inline-block;
  width: 36px;
  height: 36px;
  border: none;
  cursor: pointer;
}

.map-overlay-inner button:focus {
  outline: none;
}

.map-overlay-inner button:hover {
  box-shadow: inset 0 0 0 3px rgba(0, 0, 0, 0.1);
}
.col1 {
  /*font-weight:bolder;*/
  text-align: left;
  font-size: 16px;
}
.col2 {
  text-align: left;
  font-size: 16px;
}
.row1 {
  border-bottom: 1px solid rgb(224, 224, 224);
  margin-bottom: 6px;
  padding-bottom: 5px;
}
.title {
  font-size: 14px;
  box-shadow: 0 3px 1px rgba(255, 255, 255, 0.5);
}
/* 下拉菜单样式 */
select {
  background-color: #2d2d2d;
  color: #ffffff;
}
</style>
