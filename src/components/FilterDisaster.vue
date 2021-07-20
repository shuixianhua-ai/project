<template>
  <div class="tags">
    <el-collapse v-model="CollapseActiveNames" @change="handleChange">
      <el-collapse-item title="Selected by Disaster Type" name="1">
        <filterType />
      </el-collapse-item>
      <el-collapse-item title="Selected by Time" name="2">
        <filterTime />
      </el-collapse-item>
    </el-collapse>
    <div style="margin: 15px 0"></div>
    <div>
      <el-button round>Summit</el-button>
    </div>
    <div>
      <el-row v-for="(o, index) in 5" :key="o" :offset="index > 0 ? 5 : 0">
        <el-col>
          <el-divider></el-divider>
          <div>
            <el-card shadow="hover" class="imgfix">
              <img src="../assets/logo.png" class="image" />
            </el-card>
            <div class="imginformation">
              <div id="disastername" class="namesytle">Landslide</div>
              <div class="viceinformation">
                <h id="disaster-country">country: Indonesia </h> <br />
                <h id="disaster-date">time: 2021-04-04 </h>
              </div>
              <el-button
                plain
                class="located-button"
                type="primary"
                :loading="true"
                >Locate on map</el-button
              >
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import filterModel from "./FilterModel";

import filterType from "./Filtertype.vue";
import filterTime from "./Filter-disaster-time.vue"

export default {
  name: "filterOfPictures",
  data() {
    return {
      CollapseActiveNames: [],
    };
  },
  methods: {
    handleChange(val) {
      console.log(val);
    },
  },
  components: {
    filterModel: filterModel,
    filterType: filterType,
    filterTime:filterTime,
  },
};
</script>

<style scoped>
.image {
  width: 100%;
  display: block;
}

.imgfix {
  width: 120px;
  height: 120px;
  align-items: center;
  position: relative;
  left: 3%;
  float: left;

  display: block;
}

.imginformation {
  position: absolute;
  left: 140px;
  width: 60%;
  height: 120px;
}
.namesytle {
  position: absolute;
  top: 10px;
  width: 100%;
  left: 16px;
  text-align: left;
  font-size: 26px;
}
.viceinformation {
  position: absolute;
  top: 44px;
  width: 100%;
  right: 20px;
  text-align: right;
  font-size: 12px;
  color: #999;
}

.located-button {
  float: right;
  position: absolute;
  top: 100px;
  right: 5px;
  height: 24px;
  width: 150px;
  text-align: center;
  padding: 2px;
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
