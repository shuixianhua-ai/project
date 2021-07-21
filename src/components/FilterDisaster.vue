<template>
  <div class="tags">
    <el-collapse v-model="CollapseActiveNames" @change="queryType">
      <el-collapse-item title="Selected by Disaster Type" name="1">
        <filterType 
        @filterSelection="getSelection"
        
        />
      </el-collapse-item>
      <el-collapse-item title="Selected by Time" name="2">
        <filterTime 
        @filterSelectionTime="getSelectionTime"/>
      </el-collapse-item>
    </el-collapse>
    <div style="margin: 15px 0"></div>
    <div>
      <el-button round @click="queryType">Summit</el-button>
    </div>
    <div>
      <el-row
        v-for="(img, index) in imgList"
        :key="index"
        v-show="img.isdisplay"
        
      >
        <el-col>
          <el-divider></el-divider>
          <div>
            <el-card shadow="hover" class="imgfix">
              <img
                :src="require('../assets/disaster-img/' + img.name + '.png')"
                class="image"
                height="70px"
              />
            </el-card>
            <div class="imginformation">
              <div id="disastername" class="namesytle">{{ img.type }}</div>
              <div class="viceinformation">
                <h id="disaster-country">country: {{img.country}} </h> <br />
                <h id="disaster-date">time: {{img.date}} </h>
              </div>
              <el-button
                plain
                class="located-button"
                type="primary"
                :loading="true"
                >Locate on map</el-button
              >
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import filterModel from "./FilterModel";
import filterType from "./Filtertype.vue";
import filterTime from "./Filter-disaster-time.vue";

export default {
  name: "filterOfPictures",
  data() {
    return {
      CollapseActiveNames: [],
      selectionContent: [],
      selectionTime:[],
      imgList: [
        {
          id:"1",
          name: "img1",
          type: "Rainstorm",
          country:"China",
          date:"2020-09-02",
          isdisplay_type:true,
          isdisplay_time:true,
          isdisplay_country:true,
          isdisplay:true,
        },
        {
          id:"2",
          name: "img2",
          type: "Typhoon",
          country:"UK",
          date:"2018-01-02",
          isdisplay_type:true,
          isdisplay_time:true,
          isdisplay_country:true,
          isdisplay:true,
        },
        {
          id:"3",
          name: "img3",
          type: "Earthquake",
          country:"USA",
          date:"2010-12-26",
          isdisplay_type:true,
          isdisplay_time:true,
          isdisplay_country:true,
          isdisplay:true,

        },
        {
          id:"4",
          name: "img4",
          type: "Rainstorm",
          country:"Indonesia",
          date:"2006-08-16",
          isdisplay_type:true,
          isdisplay_time:true,
          isdisplay_country:true,
          isdisplay:true,
        },
        {
          id:"5",
          name: "img5",
          type: "Landslide",
          country:"Korea",
          date:"2000-05-02",
          isdisplay_type:true,
          isdisplay_time:true,
          isdisplay_country:true,
          isdisplay:true,
        },
      ],
    };
  },
  methods: {
    handleChange(val) {
      console.log(val);
    },
    changetype(val){

    },
    getSelection(selection) {
      //目前仅针对satellite的filter
      this.selectionContent = selection;
    },
    getSelectionTime(selection)
    {
      this.selectionTime=selection;

    },
    queryType() {
      //按type过滤
      for (var i = 0; i < this.imgList.length; i++) {
        for (var j = 0; j < this.selectionContent.length; j++) {
          console.log(this.selectionContent[j].name);
          if (this.imgList[i].type == this.selectionContent[j].name) {
            this.imgList[i].isdisplay_type = true;
            
            break;
          }
           else this.imgList[i].isdisplay_type = false;
        }
      }

        //按时间过滤
        for (var i = 0; i < this.imgList.length; i++) {
          var year=this.imgList[i].date.substr(0,4);
          var month=this.imgList[i].date.substr(5,2);
          var datanumber=(parseInt(year)-2000)*12+parseInt(month);
          console.log(this.selectionTime);
          
          if(datanumber<=Math.max(this.selectionTime[0],this.selectionTime[1])&&datanumber>=Math.min(this.selectionTime[0],this.selectionTime[1]))
          {
            this.imgList[i].isdisplay_time = true;
          }
          else
          {
            this.imgList[i].isdisplay_time = false;
          }
        
        this.imgList[i].isdisplay=this.imgList[i].isdisplay_type&&this.imgList[i].isdisplay_time&&this.imgList[i].isdisplay_country;
      }
    },
      
  },
  components: {
    filterModel: filterModel,
    filterType: filterType,
    filterTime: filterTime,
  },
};
</script>

<style scoped>
.image {
  width: 100%;
  display: block;
}

.imgfix {
  width: 120px;
  height: 120px;
  align-items: center;
  position: relative;
  left: 3%;
  float: left;

  display: block;
}

.imginformation {
  position: absolute;
  left: 140px;
  width: 60%;
  height: 120px;
}
.namesytle {
  position: absolute;
  top: 10px;
  width: 100%;
  left: 16px;
  text-align: left;
  font-size: 26px;
}
.viceinformation {
  position: absolute;
  top: 44px;
  width: 100%;
  right: 20px;
  text-align: right;
  font-size: 12px;
  color: #999;
}

.located-button {
  float: right;
  position: absolute;
  top: 100px;
  right: 5px;
  height: 24px;
  width: 150px;
  text-align: center;
  padding: 2px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}
</style>