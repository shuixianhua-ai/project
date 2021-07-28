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
      <el-button round @click="queryType">Summit</el-button>
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
                :src="require('../assets/disaster-img/img' + dis.id + '.png')"
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
              v-on:click="sendLocFlag(dis.id)"
              >Locate on map</el-button
            >
          </div>
        </el-col>
      </el-row>
    </div>

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
  name: "filterOfPictures",
  data() {
    return {
      CollapseActiveNames: [],
      selectionContent: [],
      selectionTime: [],
      Selectedid: 0,
      dialogVisible: false,
      borderid: -1,
      DisasterList: [
        // {
        //   id: "1",
        //   name: "Flooding in Switzerland",
        //   type: "Rainstorm",
        //   country: "Switzerland",
        //   location: [8, 47],
        //   date: "2021-07-15,18:23:00",
        //   description:
        //     "Heavy rainfall has caused severe flooding in parts of Switzerland. Trees have been blown onto roads and rail tracks in Zurich, causing travel chaos for commuters.A warning issued to citizens has stated that several rivers could burst their banks, while some Alpine passes were temporarily closed due to heavy snowfall.More than four centimetres of rain fell on Zurich overnight on Monday 12 July 2021 and over 3.1 centimetres of rain fell in just 10 minutes on nearby Waldegg, according to broadcaster SRF.Officials in the de facto capital, Bern, are preparing for possible flooding by installing floating dams. The country's meteorological services have warned that further rain is forecast, and also urged caution of potential landslides.Authorities near Lake Lucerne, Lake Geneva, and Lake Zurich have also issued alerts for local residents and shipping companies. Lake Lucerne, in particular, is at a very high risk of flooding, warned MeteoSchweiz.",
        //   requestor:
        //     "SwissTopo on behalf of Federal Office for Civil Protection FOCP",
        //   management: "Swiss Federal Office of Topography",
        //   isdisplay_type: true,
        //   isdisplay_time: true,
        //   isdisplay_country: true,
        //   isdisplay: true,
        // },
        // {
        //   id: "2",
        //   name: "Chemical factory explosion in Thailand",
        //   type: "Fire",
        //   country: "Thailand",
        //   location: [102, 15],
        //   date: "2021-07-06,10:32:00",
        //   description:
        //     "An explosion occurred about 03:00 am on 5 July 2021 at the Ming Dih Chemical factory, a factory producing plastic foam and plastic pellets, in Bang Phli district, Samut Prakan province, the outskirts of Thailand's capital.",
        //   requestor: "UNITAR on behalf of UNOCHA",
        //   management: "UNITAR",
        //   isdisplay_type: true,
        //   isdisplay_time: true,
        //   isdisplay_country: true,
        //   isdisplay: true,
        // },
        // {
        //   id: "3",
        //   name: "Rainstorms and landslides in Ecuador",
        //   type: "Landslide",
        //   country: "Ecuador",
        //   location: [-79, 0.37],
        //   date: "2012-03-10,11:30:00",
        //   description:
        //     "Heavy rains continued to pour inJocay, Ecuadorthis week, causing flooding across coastal communities. In an official statement from the Ecuadorian government, they announced that at least 20 people were killed and 65 people were severly injured due to flooding withincoastal provinces. 166 homes have been destroyed and 2,823 people have been evacuated from their homes to sheltersand other communities. In February, hundreds of people fled their homes to seek shelter after severe rains caused floods and damaged local crops and produce. Ecuador's National Institute of Meteorology and Hydrologyforecast further heavy rains during the months of March and April.",
        //   requestor:
        //     "USGS on behalf of Secretaría Nacional de Gestión de Riesgos - SNGR (Ecuador)",
        //   management:
        //     "Oficina de Gestión Corporativa de CLIRSEN Quito - ECUADOR",
        //   isdisplay_type: true,
        //   isdisplay_time: true,
        //   isdisplay_country: true,
        //   isdisplay: true,
        // },
        // {
        //   id: "4",
        //   name: "Volcanic eruption in Iceland",
        //   type: "Volcanic eruption",
        //   country: "Iceland",
        //   location: [-18.6, 65],
        //   date: "2019-04-10,11:00:00",
        //   description:
        //     "A volcanic eruption in Iceland spread black smoke and white steam into the air and partly melted a glacier, 700 people have been evacuated. As a consequence of the smoke cloud, most of the european airspace has been progressively closed.",
        //   requestor:
        //     "Ministry of the Interior – Direction de la Sécurité Civile - COGIC",
        //   management:
        //     "CNES in collaboration with the SAFER project in the framework of the GMES initiative",
        //   isdisplay_type: true,
        //   isdisplay_time: true,
        //   isdisplay_country: true,
        //   isdisplay: true,
        // },
      ],
    };
  },
  mounted() {
    this.init();
    console.log(this.DisasterList.length);
  },
  methods: {
    // 对 DisasterList添加灾害列表
    init() {
      axios({
        url: "http://localhost:11000/disasterResponse/disasterGetAll", // 获取所有Disaster_response
        method: "get",
      }).then((res) => {
        var len = res.data.data.length;
        var dis_data = res.data.data;

        for (var i = len - 1; i >= 0; i--) {
          this.DisasterList.push({
            id: dis_data[i].did,
            name: dis_data[i].name,
            type: dis_data[i].tag, // 需要改
            country: dis_data[i].country,
            location: [dis_data[i].lon, dis_data[i].lat],
            date: dis_data[i].startTime,
            description: dis_data[i].description,
            // 需要改成sponsor & responsor
            sponsor: dis_data[i].sponsor,
            responsor: dis_data[i].responsor,
            isdisplay_type: true,
            isdisplay_time: true,
            isdisplay_country: true,
            isdisplay: true,
          });
          console.log(dis_data[i].did);
        }
      });
    },
    handleChange(val) {},
    clickinfo(id) {
      this.dialogVisible = true;
      console.log(this.DisasterList[id - 1].name);
      this.Selectedid = id - 1;
    },

    sendLocFlag(id) {
      //var index = id.to
      var loc = this.DisasterList[id - 1].location;
      var title = this.DisasterList[id - 1].name;
      bus.$emit("LocToDisaster", loc, id);
      bus.$emit("TitleOfDisaster", title, id);
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
      //按type过滤
      for (var i = 0; i < this.DisasterList.length; i++) {
        for (var j = 0; j < this.selectionContent.length; j++) {
          console.log(this.selectionContent[j].name);
          if (this.DisasterList[i].type == this.selectionContent[j].name) {
            this.DisasterList[i].isdisplay_type = true;

            break;
          } else this.DisasterList[i].isdisplay_type = false;
        }
      }

      //按时间过滤
      for (var i = 0; i < this.DisasterList.length; i++) {
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
          this.DisasterList[i].isdisplay_country;
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

.displayrow.showborder {
  border-style: solid;
  border-color: #b3c0d1;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
}
.displayrow.hideborder {
  border-color: white;
}
</style>
