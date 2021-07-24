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
      v-model="checkedTypes"
      @change="handleCheckedTypesChange"
      align="left"
    >
      <el-checkbox
        class="el-checkbox-width"
        v-for="type in Types"
        :label="type"
        :key="type"
      >
        <img :src="type.imgSrc" class="icon-image" />
        <span id="sensor-block"> {{ type.name }} </span>
      </el-checkbox>
    </el-checkbox-group>
  </div>
</template>

<script>
const TypeOptions = [
  { imgSrc: require("../assets/icon/earthquake.png"), name: "Earthquake" },
  { imgSrc: require("../assets/icon/forestfire.png"), name: "Fire" },
  { imgSrc: require("../assets/icon/crumble.png"), name: "Landslide" },
  { imgSrc: require("../assets/icon/snow.png"), name: "Snow" },
  { imgSrc: require("../assets/icon/rainstorm.png"), name: "Rainstorm" },
  { imgSrc: require("../assets/icon/typhoon.png"), name: "Typhoon" },
  { imgSrc: require("../assets/icon/vocano.png"), name: "Volcanic eruption" },
  { imgSrc: require("../assets/icon/oceanwave.png"), name: "Ocean wave" },
  { imgSrc: "", name: "other" },
];
export default {
  name: "filterModel",

  data() {
    return {
      checkAll: false,
      checkedTypes: [],
      Types: TypeOptions,
      isIndeterminate: true,
    };
  },
  methods: {
    handleCheckAllChange(val) {
      this.checkedTypes = val ? this.Types : [];
      //console.log(this.checkedTypes);
      this.isIndeterminate = false;
      this.$emit("filterSelection", this.checkedTypes);
    },
    handleCheckedTypesChange(value) {
      let checkedCount = value.length;

      this.checkAll = checkedCount === Object.keys(this.Types).length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < Object.keys(this.Types).length;

      //传值
      this.$emit("filterSelection", this.checkedTypes);
    },
  },
};
</script>

<style scoped>
.sensor-block {
  text-align: start;
}
.el-checkbox-width {
  width: 140px;

  text-align: left;
}
.icon-image {
  height: 20px;
  width: 20px;
}
</style>
