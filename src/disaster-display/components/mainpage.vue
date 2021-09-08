<template>
  <div id="map" style="width: 100%; height: 100%">
    <selectFrame class="frame" />
  </div>
</template>
<script>
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import mapboxDraw from "@mapbox/mapbox-gl-draw";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import mapUrl from "../util/mapUrl";
import axios from "axios";

import bus from "./eventBus";
import selectFrame from "./SelectMap.vue";

export default {
  name: "mainmap",
  data() {
    return {
      flag: true,
      map: {}, // map 主变量属性
      draw: {},
      getImageUrl: "http://116.62.228.138:10003/images/GetImages",
      getDisasterUrl:
        "http://116.62.228.138:10003/disasterResponse/disasterGetAll",
      focusDisaster: 0, // 当前map关注的灾害id
      boxResData: {},
      imgList: [],
      tianStyle: {
        version: 8,
        glyphs: "mapbox://fonts/mapbox/{fontstack}/{range}.pbf",
        sources: {
          tdtvec: {
            type: "raster",
            tiles: [mapUrl.tdtvecUrl],
            tileSize: 256,
          },
          tdtcva: {
            type: "raster",
            tiles: [mapUrl.tdtcvaUrl],
            tileSize: 256,
          },
          tdtimg: {
            type: "raster",
            tiles: [mapUrl.tdtimgUrl],
            tileSize: 256,
          },
          tdtcia: {
            type: "raster",
            tiles: [mapUrl.tdtciaUrl],
            tileSize: 256,
          },
          tdtter: {
            type: "raster",
            tiles: [mapUrl.tdtterUrl],
            tileSize: 256,
          },
          tdtcta: {
            type: "raster",
            tiles: [mapUrl.tdtctaUrl],
            tileSize: 256,
          },
        },
        layers: [
          {
            id: "tdtvec",
            type: "raster",
            source: "tdtvec",
            layout: {
              visibility: "visible",
            },
            minzoom: 0,
            maxzoom: 17,
          },
          {
            id: "tdtcva",
            type: "raster",
            source: "tdtcva",
            layout: {
              visibility: "visible",
            },
            minzoom: 0,
            maxzoom: 17,
          },
          {
            id: "tdtimg",
            type: "raster",
            source: "tdtimg",
            layout: {
              visibility: "none",
            },
            minzoom: 0,
            maxzoom: 17,
          },
          {
            id: "tdtcia",
            type: "raster",
            source: "tdtcia",
            layout: {
              visibility: "none",
            },
            minzoom: 0,
            maxzoom: 17,
          },
          {
            id: "tdtter",
            type: "raster",
            source: "tdtter",
            layout: {
              visibility: "none",
            },
            minzoom: 0,
            maxzoom: 17,
          },
          {
            id: "tdtcta",
            type: "raster",
            source: "tdtcta",
            layout: {
              visibility: "none",
            },
            minzoom: 0,
            maxzoom: 17,
          },
        ],
      },
      osmStyle: "mapbox://styles/mapbox/streets-v11",
    };
  },
  components: {
    selectFrame: selectFrame,
    // FilterModel,
  },
  mounted() {
    this.init();
    var self = this;

    // 点击影像按钮，切换相应影像可见性
    bus.$on("MainpageImg", function (id, imageList) {
      for (let i = 0; i < imageList.length; i++) {
        let tempId = "Img" + (i + 1);
        let tempUrl, boxcoord;
        let imgRoute = imageList[i].mid;

        tempUrl = "api/preview?id=" + imgRoute; //"http://116.62.228.138:10003/preview?id=54d5ed36-b564-44be-bc75-9b65f3b2938d";

        if (imageList[i].did == 6) {
          boxcoord = [
            [7.66286529, 47.845914827],
            [9.130470362, 47.853627712],
            [9.128057161, 46.865628248],
            [7.6875885, 46.858175958],
          ];
        } else if (imageList[i].did == 2) {
          boxcoord = [
            [101.794084839598, 15.3596134707623],
            [102.788492891379, 15.3448615701267],
            [102.788492891379, 14.3573155020071],
            [101.781350251076, 14.3573155020071],
          ];
        } else if (imageList[i].did == 4) {
          boxcoord = [
            [-18.812958, 65.8059306952756],
            [-16.418518, 65.7528861633442],
            [-16.585999, 64.7707413515814],
            [-18.893158, 64.8214507749945],
          ];
        } else if (imageList[i].did == 5) {
          boxcoord = [
            [83.9496629151503, 27.9915778316894],
            [85.065342492413, 28.0118164219147],
            [85.0826066464353, 27.0211122585013],
            [83.9768526405984, 27.0017062170866],
          ];
        } else {
          //
          boxcoord = [
            [102.554147977806, 14.3573155020071],
            [102.554147977806, 15.3448615701267],
            [101.794084839598, 15.3596134707623],
            [101.781350251076, 14.3573155020071],
          ];
        }

        if (imageList[i].imgDisplay == true) {
          if (!self.map.getLayer(tempId)) {
            self.map.addLayer({
              id: tempId,
              type: "raster",
              source: {
                type: "image",
                // 两种方式：1.加载本地image  2.加载网页image
                url: tempUrl, //"https://docs.mapbox.com/mapbox-gl-js/assets/radar.gif", // tempUrl
                coordinates: boxcoord,
              },
            });
          }
        } else if (imageList[i].imgDisplay == false) {
          if (self.map.getLayer(tempId)) {
            self.map.removeLayer(tempId);
            self.map.removeSource(tempId);
          }
        }
      }
    });

    // 点击包围盒按钮，切换相应影像包围盒的可见性
    bus.$on("MainpageBox", function (imageList) {
      var layers = self.map.getStyle().layers;

      for (let i = 0; i < imageList.length; i++) {
        let tempId = "boxJson" + (i + 1);
        let boxgeo = imageList[i].boxgeo;

        if (imageList[i].boundingBox == true) {
          if (!self.map.getLayer(tempId)) {
            // 添加该影像的包围盒
            self.map.addLayer({
              id: tempId,
              type: "line",
              source: {
                type: "geojson",
                data: {
                  type: "FeatureCollection",
                  features: [
                    {
                      type: "Feature",
                      geometry: {
                        type: "Polygon",
                        coordinates: boxgeo,
                      },
                    },
                  ],
                },
              },
              layout: {},
              paint: {
                "line-color": "#088",
                "line-width": 1.0,
              },
            });
          } else {
            self.map.setLayoutProperty(
              self.map.getLayer(tempId),
              "visibility",
              "visible"
            );
          }
        } else if (imageList[i].boundingBox == false) {
          if (self.map.getLayer(tempId)) {
            self.map.removeLayer(tempId);
            self.map.removeSource(tempId);
          }
        }
      }
    });

    bus.$on("MainpageLoc", function (boxgeo, id) {
      // 根据影像包围盒位置，使其位于地图中央
      let x = boxgeo[0][0][0];
      let y = boxgeo[0][0][1];

      self.map.flyTo({
        center: [x, y],
      });
    });

    bus.$on("LocToDisaster", function (loc, did) {
      // 将map关注的灾害更改为did，同时center至该灾害位置
      self.focusDisaster = did;

      self.map.flyTo({
        center: loc,
      });
    });
  },
  methods: {
    init() {
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
      let that = this;

      mapboxgl.accessToken = mapUrl.MapaccessToken;
      this.map = new mapboxgl.Map({
        container: "map",
        style: that.tianStyle,
        interactive: true,
        center: [121.64, 29.7],
        zoom: 4,
      });

      // 从数据库中搜索得到包围盒，读取所有imageBox框
      axios({
        url: that.getImageUrl,
        method: "get",
      }).then((res) => {
        var length = res.data.data.length; // 从数据库共返回了几条记录
        that.boxResData = res.data.data;
      });

      that.map.on("load", function () {
        // 只在地图首次加载的过程中被运行
        that.map.addSource("openstreetmap", {
          type: "raster",
          scheme: "xyz",
          tiles: ["https://tile.openstreetmap.org/{z}/{x}/{y}.png"],
        });

        // // load image source
        // that.map.addSource("testImage", {
        //   type: "image",
        //   // 两种方式：1.加载本地image  2.加载网页image
        //   url: require("../assets/img/img1.gif"), //"https://docs.mapbox.com/mapbox-gl-js/assets/radar.gif"
        //   coordinates: [
        //     [-80.425, 46.437],
        //     [-71.516, 46.437],
        //     [-71.516, 37.936],
        //     [-80.425, 37.936],
        //   ],
        // });

        // // 直接定义的方式，添加polygon
        // that.map.addSource("boundingbox", {
        //   type: "geojson",
        //   data: {
        //     type: "FeatureCollection",
        //     features: [
        //       {
        //         type: "Feature",
        //         geometry: {
        //           type: "Polygon",
        //           coordinates: [
        //             [
        //               [-80.425, 46.437],
        //               [-71.516, 46.437],
        //               [-71.516, 37.936],
        //               [-80.425, 37.936],
        //               [-80.425, 46.437],
        //             ],
        //           ],
        //         },
        //       },
        //     ],
        //   },
        // });

        // 获取本地包围盒
        // axios.get("/static/Disaster-data/geoJson.json").then((res) => {
        //   var geoJson = eval("(" + res.data.geoJson + ")"); //eval("(" + res.data.geoJson + ")"); // text转换为json格式
        //   var geo = geoJson.coordinates[0];

        //   that.map.addLayer({
        //     id: "boundingbox_test",
        //     type: "line",
        //     source: {
        //       type: "geojson",
        //       data: {
        //         type: "FeatureCollection",
        //         features: [
        //           {
        //             type: "Feature",
        //             geometry: {
        //               type: "Polygon",
        //               coordinates: geo,
        //             },
        //           },
        //         ],
        //       },
        //     },
        //     layout: {},
        //     paint: {
        //       "line-color": "#088",
        //       "line-width": 1.0,
        //     },
        //   });
        // });

        // 读取数据库内的包围盒 geojson文件，加载要素
        // axios.get("/static/Disaster-data/boundingbox.json").then((res) => {
        //   that.map.addLayer({
        //     id: "boundingbox",
        //     type: "line",
        //     source: {
        //       type: "geojson",
        //       data: {
        //         type: "FeatureCollection",
        //         features: [
        //           {
        //             type: "Feature",
        //             geometry: {
        //               type: "Polygon",
        //               coordinates: res.data.coordinates,
        //             },
        //           },
        //         ],
        //       },
        //     },
        //     layout: {},
        //     paint: {
        //       "line-color": "#088",
        //       "line-width": 1.0,
        //     },
        //   });
        // });

        // 灾害 - 点图层，8种图标

        for (let k = 0; k < disastertype.length; k++) {
          that.map.loadImage(
            require("../assets/icon/" + disastertype[k] + ".png"), //获取对应图标
            (error, image) => {
              if (error) throw error;
              that.map.addImage(disastertype[k], image);

              //获取相应数据
              axios({
                url: that.getDisasterUrl,
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
                that.map.addLayer({
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

        // 添加图层
        // that.map.addLayer({
        //   id: "testImage",
        //   type: "raster",
        //   source: "testImage",
        // });

        // that.map.addLayer({
        //   id: "boundingbox",
        //   type: "fill",  // 多边形填充
        //   source: "boundingbox",
        //   layout: {},
        //   paint: {
        //     "fill-color": "#088",
        //     "fill-opacity": 0.8,
        //   },
        // });

        that.map.addLayer({
          id: "openstreetmap",
          type: "raster",
          source: "openstreetmap",
        });

        that.map.moveLayer("openstreetmap", "tdtvec");
      });

      this.map.on("zoom", function () {
        let zoom = that.map.getZoom();
        let pos = that.map.getCenter();
        var cent = [pos.lng, pos.lat];

        // 地图范围内没有中国且zoom > 8时，替换为osm底图
        if (
          zoom < 8 ||
          (cent[0] > 71 && cent[0] < 125 && cent[1] > 17 && cent[1] < 53) ||
          (cent[1] > 3 && cent[1] < 20 && cent[0] > 105 && cent[0] < 120)
        ) {
          that.map.moveLayer("openstreetmap", "tdtvec");
        } else {
          that.map.moveLayer("openstreetmap", "tdtcta");
          that.map.moveLayer("tdtcta", "openstreetmap");
        }
      });

      // 添加右侧的编辑条
      this.draw = new mapboxDraw({
        id: "draw",
        displayControlsDefault: false,
        controls: {
          polygon: true,
          point: true,
          line_string: true,
          trash: true,
        },
      });
      this.map.on("draw.create", this.updateArea);
      this.map.addControl(this.draw);

      // Create a popup, but don't add it to the map yet.
      var popup = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false,
      });

      // popup, 对于多个灾害图层
      // rainstorm
      for (let i = 0; i < disastertype.length; i++) {
        that.map.on("mouseenter", disastertype[i], function (e) {
          that.map.getCanvas().style.cursor = "pointer";

          var coordinates = e.features[0].geometry.coordinates.slice();
          var description = e.features[0].properties.description;

          while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
          }

          popup.setLngLat(coordinates).setHTML(description).addTo(that.map);
        });

        that.map.on("mouseleave", disastertype[i], function () {
          that.map.getCanvas().style.cursor = "";
          popup.remove();
        });
      }
    },
    updateArea(e) {
      debugger;
      // 添加图层
      this.map.addLayer({
        id: "maine",
        type: "fill",
        source: {
          type: "geojson",
          data: e.features[0],
        },
        paint: {
          "fill-color": "#4682B4",
          "fill-opacity": 0.5,
          "fill-outline-color": "#0e2944",
        },
      });
      this.draw.delete(e.features[0].id); // 删除所绘制feature

      var aoi = this.draw.getAll();
      if (aoi.features.length > 0) {
        var convertedData = aoi.features[0].geometry.coordinates[0]; // 一串坐标点
      }

      var result = this.map.queryRenderedFeatures(null, {
        layers: ["rainstorm_points"], //.filter((layer) => {this.map.getLayer(layer);}),
      });
    },
  },
};
</script>

<style scoped>
</style>
