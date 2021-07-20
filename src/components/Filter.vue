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
        <filterModel :Options="SatelliteOptions"></filterModel>
      </el-collapse-item>
    </el-collapse>
    <div style="margin: 15px 0"></div>
    <div>
      <el-button round>Summit</el-button>
    </div>
    <div style="margin: 15px 0"></div>
    <el-row>
      <el-col
        :span="8"
        v-for="(img, index) in imgList"
        :key="index"
        :offset="2"
      >
        <el-card :body-style="{ padding: '5px' }">
          <img
            height="70px"
            :src="require('../assets/raster/' + img.name + '.jpg')"
            class="image"
          />
          <div style="padding: 14px">
            <i class="el-icon-view"></i> {{ img.name }}
            <div class="bottom clearfix">{{ img.satellite }}</div>
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
      imgList: [
        {
          name: "img1",
          satellite: "LANDSAT",
        },
        {
          name: "img2",
          satellite: "GF",
        },
        {
          name: "img3",
          satellite: "KOMPSAT",
        },
        {
          name: "img4",
          satellite: "SENTINEL",
        },
        {
          name: "img5",
          satellite: "TERRASAR",
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
