<template>
  <div class="tags">
    <el-collapse v-model="CollapseActiveNames" @change="handleChange">
      <el-collapse-item title="Selected by Sensors" name="1">
        <filterModel />
      </el-collapse-item>
      <el-collapse-item title="Selected by Resolution" name="2">
        <filterModel />
      </el-collapse-item>
    </el-collapse>
    <div style="margin: 15px 0"></div>
    <div>
      <el-button round>Summit</el-button>
    </div>
    
  </div>
</template>

<script>
import filterModel from "./FilterModel";
import filterType from "./Filtertype.vue"


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
  },
};
</script>

<style scoped>

</style>
