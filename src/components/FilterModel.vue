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
      align="left"
    >
      <el-row>
        <el-checkbox v-for="sensor in Options" :label="sensor" :key="sensor">
          <el-col :span="6"
            ><div id="sensor-block">{{ sensor }}</div></el-col
          >
        </el-checkbox>
      </el-row>
    </el-checkbox-group>
  </div>
</template>

<script>
// const SensorOptions = ['Optical', 'Radar'];
// const ResolutionOptions = ['Very High','High','Medium','Low','Very Low']
// const SatelliteOptions = ['LANDSAT','GF','SENTINEL','TENDEM']
export default {
  name: "filterModel",
  props: {
    Options: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      checkAll: false,
      checkedSensors: [],
      //  sensors: SensorOptions,
      //  resolutions: ResolutionOptions,
      //  satellites: SatelliteOptions,
      isIndeterminate: true,
    };
  },
  methods: {
    handleCheckAllChange(val) {
      this.checkedSensors = val ? this.Options : [];
      this.isIndeterminate = false;
      this.$emit("filterSelection", this.checkedSensors);
    },
    handleCheckedSensorsChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.Options.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.Options.length;
      //传值
      this.$emit("filterSelection", this.checkedSensors);
    },
  },
};
</script>

<style scoped>
.sensor-block,
.el-col {
  text-align: start;
}
</style>
