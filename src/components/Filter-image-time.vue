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
            :max="60"
            :marks="marks"
            :format-tooltip="formatTooltip"
          >
          </el-slider></div
      ></el-col>
    </el-row>
  </div>
</template>


<script>
const timerange2 = [0, 60];

export default {
  name: "filterTime2",

  data() {
    return {
      Timerange2: timerange2,
      disastertime: "2020-01-13",
      marks: {
        0: "before",
        30: "disaster",
        60: "after",
      },
    };
  },
  methods: {
    formatTooltip(val) {
      //获取灾害时间
      let year = parseInt(this.disastertime.substr(0, 4));
      let month = parseInt(this.disastertime.substr(5, 2));
      let date = parseInt(this.disastertime.substr(8, 2));
      var disastertime = new Date(Date.UTC(year, month - 1, date));

      //获取滑块对应时间
      var nowtime = disastertime - (30 - val) * 86400000;
      var time = new Date(nowtime);
      var year1 = time.getFullYear();
      var month1 = time.getMonth() + 1;
      var date1 = time.getDate();

      // console.log(time);
      // console.log(year1+'-'+month1+'-'+date1);

      //获取两个滑块的值
      this.Timerange2[0] = disastertime - (30 - this.markInter[0]) * 86400000;
      this.Timerange2[1] = disastertime - (30 - this.markInter[1]) * 86400000;
      console.log(this.Timerange2[0]);
      this.$emit("filterSelectionTime2", this.Timerange2);

      return year1 + "-" + month1 + "-" + date1;
    },
  },
  components: {
    /*
      guideMarks(){
        let marks=[];
        for(let i=0;i<61;i++)
        {
          if(i==0)
          {
            marks[i]='灾前';
            
          }
          else if(i==30)
          {
            marks[i]=this.disastertime;
           
          }
          else if(i==60)
          {
            marks[i]="灾后";
            
          }
        }
        return marks;

      },
    */
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