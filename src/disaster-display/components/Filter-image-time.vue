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
import bus from "./eventBus";
import axios from "axios";

const timerange = [0, this.disasterlist];

export default {
  name: "filterTime2",
  data() {
    return {
      Timerange2: timerange, //获取滑块两端数值，用于过滤
      imgList: [], //对应事件的图像时间数组
      timeList: [], //所有图像集合
      disastertime: "2020-01-01 08:09:00", //对应灾害时间
      disasterlist: 0, //滑块长度【对应灾害图像数】
    };
  },
  mounted() {
    //获取所有图像的时间
    this.init();

    var self = this;
    //console.log(self.timeList);

    //获取选择的事件的id
    bus.$on("ImageFilterOfDisaster", function (did, date) {
      self.disastertime = date.toString().substr(0, 19);
      self.imgList = [];
      self.disasterlist = 0;
      //console.log(self.disastertime);

      //筛选出所选事件对应的图像
      for (let i = 0; i < Object.keys(self.timeList).length; i++) {
        if (self.timeList[i].did == did) {
          self.imgList.push(self.timeList[i].date);
          //console.log(self.timeList[i].date);
        }
      }
      //对所有时间进行排序，方便形成滑块
      self.imgList = self.imgList.sort();

      //保证每次滑块在首尾位置上
      self.markInter = [0, self.imgList.length];
      //console.log(self.imgList);
      
    });
  },
  methods: {
    //初始化，获取所有图像对应事件id以及图像时间
    init() {
      axios({
        url: "http://116.62.228.138:10003/images/GetImages", // 获取所有image
        method: "get",
      }).then((res) => {
        var len = res.data.data.length;
        var img_data = res.data.data;

        img_data = img_data.filter((item) => item.geoJson != null);

        //获取所有图像对应事件id以及图像时间
        for (let i = 0; i < len; i++) {
          this.timeList.push({
            did: img_data[i].did,
            date: img_data[i].date.toString().substr(0, 19),
          });

          //初始化，保证没有图像的时候滑块显示一致（如果第一个选中的事件没有图像）
          this.markInter = [0, 0];
        }

        //console.log(this.imgList);
      });
    },

    //滑块滑动后响应
    formatTooltip(val) {
      //从滑块相对数值转化成对应的时间值，并传递给过滤器
      for (let i = 0; i < 2; i++) {

        var choicetime;//表示滑块对应的时间
        //由于事件时间在slider中，但不在图像时间数组中，所以滑块值的获取需要分别表示
        if (this.markInter[i] < this.disasterlist) {
          choicetime = this.imgList[this.markInter[i]];
        } else if (this.markInter[i] == this.disasterlist) {
          choicetime = this.disastertime;
        } else {
          choicetime = this.imgList[this.markInter[i] - 1];
        }
        //console.log(choicetime);

        //转化滑块时间格式（从字符串到时间格式）
        let year = parseInt(choicetime.substr(0, 4));
        let month = parseInt(choicetime.substr(5, 2));
        let date = parseInt(choicetime.substr(8, 2));
        let hour = parseInt(choicetime.substr(11, 2));
        let min = parseInt(choicetime.substr(14, 2));
        let s = parseInt(choicetime.substr(17, 2));

        let time1 = new Date(Date.UTC(year, month - 1, date, hour, min, s));
        this.Timerange2[i] = time1;
        //console.log(this.Timerange2[i]);
      }

      //console.log(this.Timerange2);
      //将两个滑块对应的时间值传到图像过滤处，方便过滤
      this.$emit("filterSelectionTime2", this.Timerange2);
      if (val < this.disasterlist) {
        return this.imgList[val];
      } else if (val == this.disasterlist) {
        return this.disastertime;
      } else {
        return this.imgList[val - 1];
      }
    },
  },
  computed: {
    ///设置时间滑动条样式

    //设置时间滑动条长度
    getLength: function () {
      //console.log(Object.keys(this.imgList).length);
      //对应事件没有图像
      if (this.imgList.length == 0) return "1";
      //对应事件有图像
      else return Object.keys(this.imgList).length.toString();
    },

    //设置时间滑动条下方标签
    getMarks: function () {

      let marks = {};//记录滑动条标签样式内容

      //转化灾害时间格式
      let year = parseInt(this.disastertime.substr(0, 4));
      let month = parseInt(this.disastertime.substr(5, 2));
      let date = parseInt(this.disastertime.substr(8, 2));
      let hour = parseInt(this.disastertime.substr(11, 2));
      let min = parseInt(this.disastertime.substr(14, 2));
      let s = parseInt(this.disastertime.substr(17, 2));

      var disastertime = new Date(
        Date.UTC(year, month - 1, date, hour, min, s)
      );

      // 
      if (this.imgList.length > 0) {
        //转化图像时间格式
        for (let i = 0; i <= Object.keys(this.imgList).length; i++) {
          let year1 = parseInt(this.imgList[i].substr(0, 4));
          let month1 = parseInt(this.imgList[i].substr(5, 2));
          let date1 = parseInt(this.imgList[i].substr(8, 2));
          let hour1 = parseInt(this.imgList[i].substr(11, 2));
          let min1 = parseInt(this.imgList[i].substr(14, 2));
          let s1 = parseInt(this.imgList[i].substr(17, 2));

          var imgtime = new Date(
            Date.UTC(year1, month1 - 1, date1, hour1, min1, s1)
          );

          //确定灾害时间和图片时间的相对位置
          if (disastertime <= imgtime) {
            this.disasterlist = i;
            break;
          }
        }

        //生成滑动条下方标签
        for (let i = 0; i <= Object.keys(this.imgList).length; i++) {
          //先确定灾害位置
          if (this.disasterlist == i) {
            //表示灾害位置
            marks[i] = "disaster";
          } 
          //确定灾害前
          else if (i == 0) {
            marks[i] = "before";
          } 
          //确定灾害后
          else if (i == Object.keys(this.imgList).length) {
            marks[i] = "after";
          }

          //非特殊点用“*”表示
          else {
            marks[i] = {
              style: {
                color: "#ccc",
              },
              label: this.$createElement("span", "*"),
            };
          }
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
