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
    >
      <el-checkbox
        class="el-checkbox-width"
        v-for="type in Types"
        :label="type"
        :key="type"
      >
        <img :src="type.imgSrc" class="icon-image"/>
        <span id="sensor-block"> {{type.name}} </span>
        
      </el-checkbox>
    </el-checkbox-group>
  </div>
</template>

<script>
const TypeOptions  = [
  {imgSrc:require('../assets/earthquake.png'),name:"Earthquake"},
  {imgSrc:require('../assets/forestfire.png'),name:"Fire"},
  {imgSrc:require('../assets/crumble.png'),name:"Crumble"},
  {imgSrc:require('../assets/pest.png'),name:"Pest"},
  {imgSrc:require('../assets/rainstorm.png'),name:"Rainstorm"},
  {imgSrc:require('../assets/typhoon.png'),name:"Typhoon"},
  {imgSrc:require('../assets/vocano.png'),name:"Volcanic eruption"},
  {imgSrc:'',name:"other"},

];
export default {
  name: "filterModel",
  data() {
    return {
      checkAll: false,
      checkedTypes: [],
      Types: TypeOptions ,
      isIndeterminate: true,
    };
  },
  methods: {
    handleCheckAllChange(val) {
      this.checkedTypes = val ? TypeOptions  : [];
      this.isIndeterminate = false;
    },
    handleCheckedTypesChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.Type.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.Type.length;
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
.icon-image{
  height:25px;
  width:25px;
}
</style>
