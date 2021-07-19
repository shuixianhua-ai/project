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
      <el-row>
        <el-checkbox v-for="sensor in sensors" :label="sensor" :key="sensor">
          <el-col :span="6"
            ><div id="sensor-block">{{ sensor }}</div></el-col
          >
        </el-checkbox>
      </el-row>
    </el-checkbox-group>
  </div>
</template>

<script>
const SensorOptions = ["Landsat", "ZY", "TM", "SEASAT"];
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
</style>
