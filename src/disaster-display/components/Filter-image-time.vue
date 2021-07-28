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
            :min="0"
            :max="getLength"
            :marks="getMarks"
            :format-tooltip="formatTooltip"
          >
          </el-slider></div
      ></el-col>
    </el-row>
  </div>
</template>


<script>
const imgList = [
  //resolution 1-5分别对应very low,low,medium,high,very high
  {
    id: "1",
    name: "img1",
    sensor: "Optical",
    resolution: "Medium",
    satellite: "LANDSAT",
    date: "2019-12-29,13:00:54",
    imgDisplay: false,
    boundingBox: false,
    isdisplay: false,
  },
  {
    id: "2",
    name: "img2",
    sensor: "Optical",
    resolution: "Medium",
    satellite: "GF",
    date: "2020-01-01,01:00:03",
    imgDisplay: false,
    boundingBox: false,
    isdisplay: false,
  },
  {
    id: "3",
    name: "img3",
    sensor: "Radar",
    resolution: "Low",
    satellite: "LANDSAT",
    date: "2020-01-08,17:09:56",
    imgDisplay: false,
    boundingBox: false,
    isdisplay: false,
  },
  {
    id: "4",
    name: "img4",
    sensor: "Optical",
    resolution: "Very Low",
    satellite: "SENTINEL",
    date: "2020-01-13,00:08:48",
    imgDisplay: false,
    boundingBox: false,
    isdisplay: false,
  },
  {
    id: "5",
    name: "img5",
    sensor: "Radar",
    resolution: "Very High",
    satellite: "TENDEM",
    date: "2020-01-20,12:00:00",
    imgDisplay: false,
    boundingBox: false,
    isdisplay: false,
  },
];
const timerange = [0, this.disasterlist];

export default {
  name: "filterTime2",
  data() {
    return {
      Timerange2: timerange,
      imgList: imgList,
      disastertime: "2020-01-01,08:09:00",
      disasterlist: 0,
    };
  },
  methods: {
    formatTooltip(val) {
      //获取两个滑块的值

      for (let i = 0; i < 2; i++) {
        var choicetime;
        if (this.markInter[i] < this.disasterlist) {
          choicetime = this.imgList[this.markInter[i]].date;
        } else if (this.markInter[i] == this.disasterlist) {
          choicetime = this.disastertime;
        } else {
          choicetime = this.imgList[this.markInter[i] - 1].date;
        }
        let year = parseInt(choicetime.substr(0, 4));
        let month = parseInt(choicetime.substr(5, 2));
        let date = parseInt(choicetime.substr(8, 2));
        let hour = parseInt(choicetime.substr(11, 2));
        let min = parseInt(choicetime.substr(14, 2));
        let s = parseInt(choicetime.substr(17, 2));

        let time1 = new Date(Date.UTC(year, month - 1, date, hour, min, s));
        this.Timerange2[i] = time1;
      }

      // console.log(this.Timerange2);
      this.$emit("filterSelectionTime2", this.Timerange2);
      if (val < this.disasterlist) {
        return this.imgList[val].date;
      } else if (val == this.disasterlist) {
        return this.disastertime;
      } else {
        return this.imgList[val - 1].date;
      }
    },
  },
  computed: {
    getLength: function () {
      //console.log(Object.keys(this.imgList).length);
      // return Object.keys(this.imgList).length;
      return Object.keys(this.imgList).length.toString();
    },
    getMarks: function () {
      let marks = {};
      let year = parseInt(this.disastertime.substr(0, 4));
      let month = parseInt(this.disastertime.substr(5, 2));
      let date = parseInt(this.disastertime.substr(8, 2));
      let hour = parseInt(this.disastertime.substr(11, 2));
      let min = parseInt(this.disastertime.substr(14, 2));
      let s = parseInt(this.disastertime.substr(17, 2));

      var disastertime = new Date(
        Date.UTC(year, month - 1, date, hour, min, s)
      );
      for (let i = 0; i <= Object.keys(this.imgList).length; i++) {
        let year1 = parseInt(this.imgList[i].date.substr(0, 4));
        let month1 = parseInt(this.imgList[i].date.substr(5, 2));
        let date1 = parseInt(this.imgList[i].date.substr(8, 2));
        let hour1 = parseInt(this.imgList[i].date.substr(11, 2));
        let min1 = parseInt(this.imgList[i].date.substr(14, 2));
        let s1 = parseInt(this.imgList[i].date.substr(17, 2));

        var imgtime = new Date(
          Date.UTC(year1, month1 - 1, date1, hour1, min1, s1)
        );
        if (disastertime <= imgtime) {
          this.disasterlist = i;
          break;
        }
      }
      for (let i = 0; i <= Object.keys(this.imgList).length; i++) {
        if (i == 0) {
          marks[i] = "before";
        } else if (i == this.disasterlist) {
          marks[i] = "disaster";
        } else if (i == Object.keys(this.imgList).length) {
          marks[i] = "after";
        } else {
          marks[i] = {
            style: {
              color: "#ccc",
            },
            label: this.$createElement("span", "*"),
          };
        }
      }

      return marks;
    },
  },
};
</script>

<style scoped>
.slider {
  width: 84%;
  position: absolute;
  left: 30px;
  box-sizing: border-box;
}

.bg-purple-dark {
  height: 55px;
}
</style>
