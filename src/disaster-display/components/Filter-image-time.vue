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
      Timerange2: timerange,//获取滑块两端数值，用于过滤
      imgList: [],//对应事件的图像时间数组
      timeList:[],//所有图像集合
      disastertime: "2020-01-01 08:09:00",//对应灾害时间
      disasterlist: 0,//滑块长度【对应灾害图像数】
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
      //self.imgList=[];
      //console.log(self.disastertime);

      //筛选出所选事件对应的图像
      for (let i = 0; i < Object.keys(self.timeList).length; i++) {
        if (self.timeList[i].did == did) {
          self.imgList.push(self.timeList[i].date);
          //console.log(self.timeList[i].date);
        }
      }
      
      self.imgList = self.imgList.sort();
      //console.log(self.imgList);
      // this.init(did);
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
              did:img_data[i].did,
              date:img_data[i].date.toString().substr(0, 19),

            }
               
            );
          
        }
        
        //console.log(this.imgList);
      });
    },

    //滑块滑动后响应
    formatTooltip(val) {
      
      //从滑块相对数值转化成对应的时间值，并显示在上方标签上
      for (let i = 0; i < 2; i++) {
        var choicetime;
        if (this.markInter[i] < this.disasterlist) {
          choicetime = this.imgList[this.markInter[i]];
        } else if (this.markInter[i] == this.disasterlist) {
          choicetime = this.disastertime;
        } else {
          choicetime = this.imgList[this.markInter[i] - 1];
        }
        //console.log(choicetime);
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
      // return Object.keys(this.imgList).length;
      return Object.keys(this.imgList).length.toString();
    },

    //设置时间滑动条下方标签
    getMarks: function () {

      let marks = {};
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
        
        //开头标签
        if (i == 0) {
          //所有图像时间都在灾害后
          if(this.disasterlist==0)
          {
            marks[i] = "disaster";
          }
          //表示灾害前图像
          else
          {
            marks[i] = "before";
          } 
        } 

        //灾害点标签
        else if (i == this.disasterlist) 
        {
          //表示灾害位置
          marks[i] = "disaster";
        } 

        //末尾标签
        else if (i == Object.keys(this.imgList).length) 
        {
          //所有图像时间都在灾害后
          if(this.disasterlist==i)
          {
            marks[i] = "disaster";
          }
          //表示灾害后图像
          else
          {
            marks[i] = "after";
          }
          
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
