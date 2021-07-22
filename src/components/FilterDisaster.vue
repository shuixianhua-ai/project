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
        v-for="(img, index) in imgList"
        :key="index"
        v-show="img.isdisplay"
      >
        <el-col>
          <el-divider></el-divider>
          <div>
            <el-card shadow="hover" class="imgfix" @click.native="clickinfo">
              <img
                :src="require('../assets/disaster-img/img' + img.id + '.png')"
                class="image"
                height="70px"
              />
              <div style="font-size:5px"></div>
            </el-card>
            <div class="imginformation">
              <div id="disastername" class="namesytle">{{ img.name }}</div>
              <div class="viceinformation">
                 <h id="disaster-date">time: {{ img.date }} </h><br />
                <h id="disaster-type">type: {{ img.type }} </h>
              </div>
              <!--el-button
              size = "mini"
              type = "info"
              icon = "el-icon-info"
              circle plain
              ></el-button>-->
              <el-button
                plain
                class="located-button"
                type="primary"
                
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
      selectionTime: [],
      imgList: [
        {
          id: "1",
          name: "Flooding in Switzerland",
          type: "Rainstorm",
          country: "Switzerland",
          date: "2021-07-15,18:23:00",
          description:"Heavy rainfall has caused severe flooding in parts of Switzerland. Trees have been blown onto roads and rail tracks in Zurich, causing travel chaos for commuters.A warning issued to citizens has stated that several rivers could burst their banks, while some Alpine passes were temporarily closed due to heavy snowfall.More than four centimetres of rain fell on Zurich overnight on Monday 12 July 2021 and over 3.1 centimetres of rain fell in just 10 minutes on nearby Waldegg, according to broadcaster SRF.Officials in the de facto capital, Bern, are preparing for possible flooding by installing floating dams. The country's meteorological services have warned that further rain is forecast, and also urged caution of potential landslides.Authorities near Lake Lucerne, Lake Geneva, and Lake Zurich have also issued alerts for local residents and shipping companies. Lake Lucerne, in particular, is at a very high risk of flooding, warned MeteoSchweiz.",
          requestor:"SwissTopo on behalf of Federal Office for Civil Protection FOCP",
          management:"Swiss Federal Office of Topography",
          isdisplay_type: true,
          isdisplay_time: true,
          isdisplay_country: true,
          isdisplay: true,
        },
        {
          id: "2",
          name: "Chemical factory explosion in Thailand",
          type: "Fire",
          country: "Thailand",
          date: "2021-07-06,10:32:00",
          description:"An explosion occurred about 03:00 am on 5 July 2021 at the Ming Dih Chemical factory, a factory producing plastic foam and plastic pellets, in Bang Phli district, Samut Prakan province, the outskirts of Thailand's capital.",
          requestor:"UNITAR on behalf of UNOCHA",
          management:"UNITAR",
          isdisplay_type: true,
          isdisplay_time: true,
          isdisplay_country: true,
          isdisplay: true,
        },
        {
           id: "3",
          name: "Floods and landslides in Ecuador",
          type: "Landslide",
          country: "Ecuador",
          date: "2012-03-10,11:30:00",
          description:"Heavy rains continued to pour inJocay, Ecuadorthis week, causing flooding across coastal communities. In an official statement from the Ecuadorian government, they announced that at least 20 people were killed and 65 people were severly injured due to flooding withincoastal provinces. 166 homes have been destroyed and 2,823 people have been evacuated from their homes to sheltersand other communities. In February, hundreds of people fled their homes to seek shelter after severe rains caused floods and damaged local crops and produce. Ecuador's National Institute of Meteorology and Hydrologyforecast further heavy rains during the months of March and April.",
          requestor:"USGS on behalf of Secretaría Nacional de Gestión de Riesgos - SNGR (Ecuador)",
          management:"Oficina de Gestión Corporativa de CLIRSEN Quito - ECUADOR",
          isdisplay_type: true,
          isdisplay_time: true,
          isdisplay_country: true,
          isdisplay: true,
        },
        {
           id: "4",
          name: "Volcanic eruption in Iceland",
          type: "Volcanic eruption",
          country: "Iceland",
          date: "2010-04-10,11:00:00",
          description:"A volcanic eruption in Iceland spread black smoke and white steam into the air and partly melted a glacier, 700 people have been evacuated. As a consequence of the smoke cloud, most of the european airspace has been progressively closed.",
          requestor:"Ministry of the Interior – Direction de la Sécurité Civile - COGIC",
          management:"	CNES in collaboration with the SAFER project in the framework of the GMES initiative",
          isdisplay_type: true,
          isdisplay_time: true,
          isdisplay_country: true,
          isdisplay: true,
        },
        {
           id: "5",
          name: "Earthquake in China",
          type: "Earthquake",
          country: "China",
          date: "2021-05-22,00:36:00",
          description:"A 7.4-magnitude earthquake struck Northwest China's Qinghai province on 22 May 2021. The quake struck Maduo county of Golog Tibetan autonomous prefecture at 2:04 am.The epicenter was monitored at 34.59 degrees north latitude and 98.34 degrees east longitude and struck at a depth of 17 km. There have been no reports of casualties and house collapses, however highway sections and bridges have collapsed in the quake-hit area making it impassable to vehicles.",
          requestor:"	National Disaster Reduction Center of China (NDRCC)",
          management:"CNSA",
          isdisplay_type: true,
          isdisplay_time: true,
          isdisplay_country: true,
          isdisplay: true,
        },
      ],
    };
  },
  methods: {
    handleChange(val) {
      console.log(val);
    },
    clickinfo() {
      console.log("success");
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
      for (var i = 0; i < this.imgList.length; i++) {
        for (var j = 0; j < this.selectionContent.length; j++) {
          console.log(this.selectionContent[j].name);
          if (this.imgList[i].type == this.selectionContent[j].name) {
            this.imgList[i].isdisplay_type = true;

            break;
          } else this.imgList[i].isdisplay_type = false;
        }
      }

      //按时间过滤
      for (var i = 0; i < this.imgList.length; i++) {
        var year = this.imgList[i].date.substr(0, 4);
        var month = this.imgList[i].date.substr(5, 2);
        var datanumber = (parseInt(year) - 2000) * 12 + parseInt(month);
        console.log(this.selectionTime);

        if (
          datanumber <=
            Math.max(this.selectionTime[0], this.selectionTime[1]) &&
          datanumber >= Math.min(this.selectionTime[0], this.selectionTime[1])
        ) {
          this.imgList[i].isdisplay_time = true;
        } else {
          this.imgList[i].isdisplay_time = false;
        }

        this.imgList[i].isdisplay =
          this.imgList[i].isdisplay_type &&
          this.imgList[i].isdisplay_time &&
          this.imgList[i].isdisplay_country;
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
  top: 2px;
  width: 100%;
  left: 12px;
  text-align: left;
  font-size: 20px;
}
.viceinformation {
  position: absolute;
  top: 72px;
  width: 100%;
  right: 20px;
  text-align: right;
  font-size: 10px;
  color: #999;
}

.located-button {
  float: right;
  position: absolute;
  top: 110px;
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
