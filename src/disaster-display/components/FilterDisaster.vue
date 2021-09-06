<template>
  <div class="tags">
    <el-collapse v-model="CollapseActiveNames" @change="changetype">
      <el-collapse-item title="Selected by Disaster Type" name="1">
        <filterType @filterSelection="getSelection" />
      </el-collapse-item>
      <el-collapse-item title="Selected by Time" name="2">
        <filterTime @filterSelectionTime="getSelectionTime" />
      </el-collapse-item>
    </el-collapse>
    <div style="margin: 15px 0"></div>
    <div>
      <el-button round @click="queryType">Submit</el-button>
    </div>
    <div>
      <el-row
        style="margin-top: 20px; margin-bottom: 20px"
        v-for="(dis, index) in DisasterList"
        :key="index"
        v-show="dis.isdisplay"
        :gutter="20"
        class="displayrow"
        :class="borderid == index ? 'showborder' : 'hideborder'"
      >
        <!-- <el-divider></el-divider> -->
        <el-col :span="8">
          <div class="pic">
            <el-card
              shadow="hover"
              class="card"
              style="margin-top: 15px"
              @click.native="clickinfo(dis.id)"
            >
              <img
                :src="require('../assets/disaster-img/img' + dis.did + '.png')"
                class="image"
              />
            </el-card>
            <div style="margin: 30px 0"></div>
          </div>
        </el-col>
        <el-col :span="16">
          <div class="des" style="margin-top: 15px">
            <div style="text-align: left; font-size: 20px">{{ dis.name }}</div>
            <div style="margin: 15px 0"></div>
            <div style="text-align: right; font-size: 10px; color: #999">
              <h id="disaster-date">time: {{ dis.date }} </h><br />
              <h id="disaster-type">type: {{ dis.type }} </h>
            </div>
            <div style="margin: 15px 0"></div>
            <el-button
              plain
              class="located-button"
              type="primary"
              style="margin-bottom: 15px"
              v-on:click="sendLocFlag(dis.id, dis.did)"
              >Locate on map</el-button
            >
          </div>
        </el-col>
      </el-row>
    </div>
    <!-- test code -->
    <!-- <div>
      <p style="color:red;">Num：{{ myIndex }}</p>
    <p>{{ msg }}</p>
    </div> -->
    <!-- test code -->

    <el-dialog :visible.sync="dialogVisible" width="55%">
      <div style="margin: 15px 0"></div>
      <el-tabs type="border-card">
        <el-row class="row1">
          <el-col :span="5" class="col1">Name:</el-col>
          <el-col :span="1">&ensp;&ensp;</el-col>
          <el-col :span="18" class="col2">{{
            this.DisasterList[Selectedid].name
          }}</el-col>
        </el-row>
        <el-row class="row1">
          <el-col :span="5" class="col1">Type of Event:</el-col>
          <el-col :span="1">&ensp;&ensp;</el-col>
          <el-col :span="18" class="col2">{{
            this.DisasterList[Selectedid].type
          }}</el-col>
        </el-row>
        <el-row class="row1">
          <el-col :span="5" class="col1">Location:</el-col>
          <el-col :span="1">&ensp;&ensp;</el-col>
          <el-col :span="18" class="col2">{{
            this.DisasterList[Selectedid].country
          }}</el-col>
        </el-row>
        <el-row class="row1">
          <el-col :span="5" class="col1">Date:</el-col>
          <el-col :span="1">&ensp;&ensp;</el-col>
          <el-col :span="18" class="col2">{{
            this.DisasterList[Selectedid].date
          }}</el-col>
        </el-row>
        <el-row class="row1">
          <el-col :span="5" class="col1">Disaster sponsor:</el-col>
          <el-col :span="1">&ensp;&ensp;</el-col>
          <el-col :span="18" class="col2">{{
            this.DisasterList[Selectedid].sponsor
          }}</el-col>
        </el-row>
        <el-row class="row1">
          <el-col :span="5" class="col1">Project responsor:</el-col>
          <el-col :span="1">&ensp;&ensp;</el-col>
          <el-col :span="18" class="col2">{{
            this.DisasterList[Selectedid].responsor
          }}</el-col>
        </el-row>
        <el-row>
          <el-col :span="5" class="col1">Description:</el-col>
          <el-col :span="1">&ensp;&ensp;</el-col>
          <el-col :span="18" class="col2">{{
            this.DisasterList[Selectedid].description
          }}</el-col>
        </el-row>
      </el-tabs>
    </el-dialog>
  </div>
</template>

<script>
import filterModel from "./FilterModel";
import filterType from "./Filtertype.vue";
import filterTime from "./Filter-disaster-time.vue";
import bus from "./eventBus";
import axios from "axios";

export default {
  name: "filterOfDisaster",
  data() {
    return {
      CollapseActiveNames: [],
      selectionContent: [],
      selectionTime: [],
      Selectedid: 0,
      dialogVisible: false,
      borderid: -1,
      DisasterList: [],
      myIndex: 0, //灾害类型传值变量
    };
  },
  mounted() {
    this.myIndex = parseInt(this.$route.query.id); //获取首页灾害id
    console.log(this.myIndex + "   index");
    this.init();
  },
  methods: {
    // 对 DisasterList 添加灾害列表
    init() {
      axios({
        url: "http://116.62.228.138:10003/disasterResponse/disasterGetAll", // 获取所有Disaster_response
        method: "get",
      }).then((res) => {
        var len = res.data.data.length;
        var dis_data = res.data.data;

        dis_data = dis_data.filter((item) => item.description != null);

        let totalNum = 0;
        for (let i = 0; i < len; i++) {
          this.DisasterList.push({
            id: ++totalNum, // 在项目中的disaster-id，从1起始
            did: dis_data[i].did, // 原始 disaster-id
            name: dis_data[i].name,
            type: dis_data[i].tag,
            country: dis_data[i].country,
            location: [dis_data[i].lon, dis_data[i].lat],
            date: dis_data[i].startTime,
            description: dis_data[i].description,
            sponsor: dis_data[i].sponsor,
            responsor: dis_data[i].responsor,
            geojson: dis_data[i].aoijson,
            dtype: dis_data[i].dtype, //灾害类型id
            isdisplay_type: true,
            isdisplay_time: true,
            isdisplay_country: true,
            isdisplay_did: true,
            isdisplay: false,
          });
        }

        //id设置转化
        if (this.myIndex == 2) this.myIndex = 5;
        else if (this.myIndex == 5) this.myIndex = 2;
        else {
        }
        //按首页点击的灾害类型过滤
        for (let i = 0; i < this.DisasterList.length; i++) {
          if (this.DisasterList[i].dtype == this.myIndex || this.myIndex == 0) {
            this.DisasterList[i].isdisplay = true;
          } else this.DisasterList[i].isdisplay = false;
        }
      });
    },
    handleChange(val) {},
    clickinfo(id) {
      this.dialogVisible = true;
      this.Selectedid = id - 1;
    },

    sendLocFlag(id, did) {
      //var index = id.to
      var loc = this.DisasterList[id - 1].location;
      var title = this.DisasterList[id - 1].name;
      var date = this.DisasterList[id-1].date;
      bus.$emit("LocToDisaster", loc, did);
      bus.$emit("TitleOfDisaster", title, id);
      bus.$emit("ImageOfDisaster", did,date);
      bus.$emit("ImageOfDisaster1", did,date);
      bus.$emit("ProductOfDisaster", id);
      this.borderid = id - 1;
    },

    changetype(val) {},
    getSelection(selection) {
      //目前仅针对satellite的filter
      this.selectionContent = selection;
    },
    getSelectionTime(selection) {
      this.selectionTime = selection;
    },
    queryType() {
      //按勾选的灾害类型过滤
      for (let i = 0; i < this.DisasterList.length; i++) {
        // if (this.selectionContent.length == 0) {
        //   this.DisasterList[i].isdisplay_type = false;
        // }
        for (let j = 0; j < this.selectionContent.length; j++) {
          if (this.DisasterList[i].type == this.selectionContent[j].name) {
            this.DisasterList[i].isdisplay_type = true;
            break;
          } else this.DisasterList[i].isdisplay_type = false;
        }
      }

      //按勾选的时间过滤
      for (let i = 0; i < this.DisasterList.length; i++) {
        var year = this.DisasterList[i].date.substr(0, 4);
        var month = this.DisasterList[i].date.substr(5, 2);
        var datanumber = (parseInt(year) - 2000) * 12 + parseInt(month);
        console.log(this.selectionTime);

        if (
          datanumber <=
            Math.max(this.selectionTime[0], this.selectionTime[1]) &&
          datanumber >= Math.min(this.selectionTime[0], this.selectionTime[1])
        ) {
          this.DisasterList[i].isdisplay_time = true;
        } else {
          this.DisasterList[i].isdisplay_time = false;
        }

        this.DisasterList[i].isdisplay =
          this.DisasterList[i].isdisplay_type &&
          this.DisasterList[i].isdisplay_time &&
          this.DisasterList[i].isdisplay_country &&
          this.DisasterList[i].isdisplay_did;
      }
      this.myIndex = 0; // 更新index，过滤条件初始化
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

.card >>> .el-card__body {
  padding: 0px;
}

.located-button {
  float: right;
  height: 24px;
  width: 150px;
  text-align: center;
  padding: 2px;
}

.col1 {
  /*font-weight:bolder;*/
  text-align: left;
  font-size: 16px;
}
.col2 {
  text-align: left;
  font-size: 16px;
}
.row1 {
  border-bottom: 1px solid rgb(216, 215, 215);
  margin-bottom: 6px;
  padding-bottom: 5px;
}
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}

/* 选中显示的卡片 */
.displayrow.showborder {
  color: #ffffff;
  border-style: solid;
  border-color: #409eff;
  box-shadow: 0 2px 4px rgba(81, 172, 233, 0.72),
    0 0 6px rgba(81, 172, 233, 0.94);
}
/* 未选中时卡片 */
.displayrow.hideborder {
  color: #ffffff;
  box-shadow: 0 2px 4px rgba(255, 255, 255, 0.72),
    0 0 6px rgba(255, 255, 255, 0.94);
}
</style>
