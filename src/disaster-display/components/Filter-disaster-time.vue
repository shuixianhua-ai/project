<template>
  <div class="tags">
    <el-row>
      <el-col :span="24">
        <div class="bg-purple-dark">
          <el-slider
            class="slider"
            id="timeslider"
            v-model="markInter"
            range
            show-stops
            :step="1"
            :max="263"
            :marks="marks"
            :format-tooltip="formatTooltip"
          >
          </el-slider></div
      ></el-col>
    </el-row>
  </div>
</template>


<script>

//方便得到总的时间范围
// function getArrayIndex(arr, obj) {
//   var i = arr.length;
//   while (i--) {
//     if (arr[i] === obj) {
//       return i;
//     }
//   }
//   return -1;
// }

//月份数组，方便计算时间间隔
const Months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const timerange = [0, 263];
//方便得到总的时间范围
// const x =
//   ("2021" - "2000") * 12 +
//   getArrayIndex(Months, "Dev") -
//   getArrayIndex(Months, "Jan");
// var number = x.toString();
// console.log(x);
export default {
  name: "filterTime",
  data() {
    return {

      Timerange: timerange,//初始滑块范围
      //初始化标签
      marks: {
        0: "Jan,2000",

        263: "Dec,2021",
      },
    };
  },
  methods: {
    //滑块移动响应,包括标签动态显示以及传递滑块值给过滤
    formatTooltip(val) {
      //计算滑块到2000年1月的时间距离确定对应时间
      let month = Months[0];
      let year = 2000;
      year = parseInt(val / 12);
      month = Months[val - year * 12];
      year = 2000 + year;

      let time = month + "," + year;

      //获取滑块值
      this.Timerange[0] = this.markInter[0];
      this.Timerange[1] = this.markInter[1];
      // console.log(this.Timerange);

      //传递滑块值
      this.$emit("filterSelectionTime", this.Timerange);
      
      //返回对应标签
      return time;
    },
  },
};
</script>

<style scoped>
.slider {
  width: 80%;
  position: absolute;
  left: 30px;
  box-sizing: border-box;
}

.bg-purple-dark {
  height: 55px;
}
</style>
