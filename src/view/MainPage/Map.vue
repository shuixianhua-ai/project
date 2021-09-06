<template>
<div>
  <div>
  <!-- <nav id="menu" v-if="2==2"></nav> -->
  <div id='map'></div>
  <!-- <el-button v-if="type=='2'" @click="loadData()">loadData</el-button> -->
  <!-- <nav id="menu" v-show="type=='2'">Response</nav> -->
  <div v-show="type=='2'"><response></response></div>
  </div>
</div>
</template>

<script>
// 也可以全局引入 但是建议map对象还是少做传值，可以通过组件通信，统一在此处操作
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import Response from './Response'
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import axios from "axios";
import mapUrl from "../util/mapUrl";
let storage = window.localStorage

export default {
  components: { Response },
  name: 'Map',
  data () {
    return {
      type:storage['type'],
      datasource: {},
      getImageUrl: "http://116.62.228.138:10003/images/GetImages",
      getDisasterUrl: "http://116.62.228.138:10003/disasterResponse/disasterGetAll",
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    
    init () {
      //灾害数组
      let disastertype = [
        "earthquake",
        "forestfire",
        "landslide",
        "snow",
        "rainstorm",
        "typhoon",
        "vocano",
        "oceanwave",
      ];
      var url = 'https://webapi.amap.com/maps?v=1.4.15&key=69af142a5df4feb0d3149bd89f2a0901&callback=onLoad';
      var jsapi = document.createElement('script');
      jsapi.charset = 'utf-8';
      jsapi.src = url;
      let mydata = this
      mydata.$axios({
        method: 'get',
        url: 'http://116.62.228.138:10003/disasterResponse/disasterGetAll'
      })
        .then(res => {
          // console.log(res.data.data, 'data.data')
          mydata.datasource = res.data.data
        })

      mapboxgl.accessToken = 'pk.eyJ1IjoiaHVkYW53ZWkiLCJhIjoiY2tyZDNmbGY4NTgzZjJxbzZnem1zZ21yNCJ9.WR-eaeODn3yE84w_wyvg1Q'
      let localhost = window.location.origin
      //设置地图数据源
      let sources = {
        'osm-tiles1': {
          'type': 'raster',
          'tiles': [
            'http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetPurplishBlue/MapServer/tile/{z}/{y}/{x}'
          ],
          'tileSize': 256
        },
        'osm-tiles2': {
          'type': 'raster',
          'tiles': [
            'http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetPurplishBlue/MapServer/tile/{z}/{y}/{x}'
          ],
          'tileSize': 256
        }
      }
      let layers = [{
        'id': 'simple-tiles1',
        'type': 'raster',
        'source': 'osm-tiles1'
      },
      {
        'id': 'simple-tiles2',
        'type': 'raster',
        'source': 'osm-tiles2'
      }
      ]
      //引入地图变量
      var map = new mapboxgl.Map({
        container: 'map',
        zoom: 1.35,
        maxZoom:1.5,
        minZoom:1.2,
        // renderWorldCopies:false
        center: [10, 10],
        logoPosition: 'bottom-right',
        style: {
          'version': 8,
          'sprite': 'mapbox://sprites/mapbox/streets-v8',
          'glyphs': localhost + '/MapBoxGL/css/font/{fontstack}/{range}.pbf',
          'sources': sources,
          'layers': layers
        }
        
      })
      
      var id = 'Response';
      var link = document.createElement('a');
      link.href = '#';
      link.className = 'active';

      var responseLayers = document.getElementById('menu');
      responseLayers.appendChild(link);
      
      //加载图层
      map.on('load', function () {
           for (let k = 0; k < disastertype.length; k++) {
          map.loadImage(
            require("../assets/icon/" + disastertype[k] + ".png"), //获取对应图标
            (error, image) => {
              if (error) throw error;
                map.addImage(disastertype[k], image);

              //获取相应数据
              axios({
                url: 'http://116.62.228.138:10003/disasterResponse/disasterGetAll',
                method: "get",
              }).then((res) => {
                var len = res.data.data.length;
                var dis_data = res.data.data;
                let feature = []; //灾害点数据

                for (let i = 0; i < len; i++) {
                  //选择地震类型的数据
                  if (dis_data[i].dtype == k + 1) {
                    let geo = []; //单个灾害点位置
                    let property = []; //单个灾害属性信息
                    let Coor = new Array(); //单个灾害点位置数据
                    let des =
                      "<strong>" +
                      dis_data[i].name +
                      "</strong><p>" +
                      dis_data[i].startTime +
                      "</p><p>" +
                      dis_data[i].description +
                      "</p>"; //单个灾害的描述

                    Coor[0] = dis_data[i].lon;
                    Coor[1] = dis_data[i].lat;

                    geo.push({
                      type: "Point",
                      coordinates: Coor,
                    });

                    property.push({
                      description: des,
                    });

                    feature.push({
                      type: "Festure",
                      properties: property[0],
                      geometry: geo[0],
                    });
                  }
                }

                let geo = [{ type: "FeatureCollection", features: feature }]; // 所有地震数据

                //将数据转化成json格式
                let point = JSON.stringify(geo[0]);
                let point2 = JSON.parse(point);

                //在map中添加图层
                map.addLayer({
                  id: disastertype[k],
                  type: "symbol",
                  source: {
                    type: "geojson",
                    data: point2,
                  },
                  layout: {
                    "icon-image": disastertype[k],
                    "icon-size": 0.25,
                  },
                });
              });
            }
          );
        }
      var popup = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false,
      });

      // popup, 对于多个灾害图层
      for (let i = 0; i < disastertype.length; i++) {
        map.on("mouseenter", disastertype[i], function (e) {
          map.getCanvas().style.cursor = "pointer";

          var coordinates = e.features[0].geometry.coordinates.slice();
          var description = e.features[0].properties.description;

          while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
          }

          popup.setLngLat(coordinates).setHTML(description).addTo(map);
        });

        map.on("mouseleave", disastertype[i], function () {
          map.getCanvas().style.cursor = "";
          popup.remove();
        });
      }
      //   // When a click event occurs on a feature in the places layer, open a popup at the
      //   // location of the feature, with description HTML from its properties.
      //   map.on('click', 'places', function (e) {
      //     var coordinates = e.features[0].geometry.coordinates.slice()
      //     var description = e.features[0].properties.description

      //     // Ensure that if the map is zoomed out such that multiple
      //     // copies of the feature are visible, the popup appears
      //     // over the copy being pointed to.
      //     while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
      //       coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360
      //     }

      //     new mapboxgl.Popup()
      //       .setLngLat(coordinates)
      //       .setHTML(description)
      //       .addTo(map)
      //   })

      //   // Change the cursor to a pointer when the mouse is over the places layer.
      //   map.on('mouseenter', 'places', function () {
      //     map.getCanvas().style.cursor = 'pointer'
      //   })

      //   // Change it back to a pointer when it leaves.
      //   map.on('mouseleave', 'places', function () {
      //     map.getCanvas().style.cursor = ''
      //   })
      // })
      let controls = map._controls
      controls.forEach((control) => {
        // 去除logo控件
        if ('_updateLogo' in control) {
          map.removeControl(control)
        }

        // 去除attribute控件
        if ('_attribHTML' in control) {
          map.removeControl(control)
        }
        
      })
      
    },
      )}
  }
}

</script>

<style scoped>
    #map {
      bottom: 0;
      width: 100%;
      height: 650px;
      /* z-index: -1; */
    }
    button {
      position: absolute;
      margin: 20px;
      color: yellow;
    }
   #menu {
        background: #3887be;
        position: absolute;
        z-index: 1;
        top: 100px;
        right: 38px;
        border-radius: 3px;
        width: 120px;
        height: 50px;
        border: 1px solid rgba(0,0,0,0.4);
        font-family: 'Open Sans', sans-serif;
        line-height:50px;
    }
</style>