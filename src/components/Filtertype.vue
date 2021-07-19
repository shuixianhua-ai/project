<template>
  <div class="tags">
    <el-row>
      <el-col :span="6">
        <el-checkbox
          :indeterminate="isIndeterminate"
          v-model="checkAll"
          @change="handleCheckAllChange"
        >
          Select All
        </el-checkbox>
      </el-col>
    </el-row>
    <div style="margin: 15px 0"></div>
    <el-checkbox-group  
      v-model="checkedSensors"
      @change="handleCheckedSensorsChange"
    >
      
        <el-checkbox class="el-checkbox-width" v-for="sensor in sensors" :label="sensor" :key="sensor">
          
          <div id="sensor-block">{{ sensor }}</div>
        </el-checkbox>
      
    </el-checkbox-group>
  </div>
</template>

<script>
const SensorOptions = ["Landslide", "Earthquake", "Oil spill", "Flood","Volcanic eruption","Fire","Cyclone","Ocean wave","Snow","Other",];
export default {
  name: "filterModel",
  data() {
    return {
      checkAll: false,
      checkedSensors: [],
      sensors: SensorOptions,
      isIndeterminate: true,
    };
  },
  methods: {
    handleCheckAllChange(val) {
      this.checkedSensors = val ? SensorOptions : [];
      this.isIndeterminate = false;
    },
    handleCheckedSensorsChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.sensors.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.sensors.length;
    },
  },
};
</script>

<style scoped>
.sensor-block {
  text-align: start;
}
.el-checkbox-width{
  width: 140px;
  height: 25px;
  float: left;

}

</style>
