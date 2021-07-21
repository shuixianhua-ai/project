<template>
  <div id="map" style="width: 100%; height: 100%"></div>
</template>

<script>
//也可以全局引入 但是建议map对象还是少做传值，可以通过组件通信，统一在此处操作
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import mapboxDraw from "@mapbox/mapbox-gl-draw";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import mapUrl from "../util/mapUrl";
import axios from "axios";

import bus from "./eventBus";

export default {
  name: "mainmap",
  data() {
    return {
      flag: true,
      map: {}, // map 主变量属性
      draw: {},
      imgList: [
        {
          id: "1",
          isDisplay: false,
          boundingBox: false,
        },
        {
          id: "2",
          isDisplay: false,
          boundingBox: false,
        },
      ],
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
  mounted() {
    this.init();
    var self = this;
    bus.$on("MainpageFlag", function (id, flag) {
      // 1. 在imgList中，查询是否存在该id，若存在，则更改其flag；若不存在，则在列表中增加该对象

      var modiIndex = self.imgList.findIndex((v) => {
        return v.id == id;
      });
      if (modiIndex < 0) {
        self.imgList.push({
          id: id,
          isDisplay: true,
          boundingBox: false,
        });
      } else {
        self.imgList[modiIndex].isDisplay = !self.imgList[modiIndex].isDisplay;
      }

      // 遍历ImgList
      for (var i = 1; i <= self.imgList.length; i++) {
        var tempId = "Image" + i;
        var tempUrl = require("../assets/img/img" + i + ".gif");
        if (self.imgList[i - 1].isDisplay == true) {
          self.map.addLayer({
            id: tempId,
            type: "raster",
            source: {
              type: "image",
              // 两种方式：1.加载本地image  2.加载网页image
              url: tempUrl, //"https://docs.mapbox.com/mapbox-gl-js/assets/radar.gif"
              coordinates: [
                [-80.425, 46.437],
                [-71.516, 46.437],
                [-71.516, 37.936],
                [-80.425, 37.936],
              ],
            },
          });
        } else if (self.imgList[i - 1].isDisplay == false) {
          if (self.map.getLayer(tempId)) {
            self.map.removeLayer(tempId);
            self.map.removeSource(tempId);
          }
        }
      }
    });
  },
  methods: {
    init() {
      let that = this;

      mapboxgl.accessToken = mapUrl.MapaccessToken;
      this.map = new mapboxgl.Map({
        container: "map",
        style: that.tianStyle,
        interactive: true,
        center: [121.64, 29.7],
        zoom: 4,
      });

      that.map.on("load", function () {
        // 只在地图首次加载的过程中被运行
        that.map.addSource("openstreetmap", {
          type: "raster",
          scheme: "xyz",
          tiles: ["https://tile.openstreetmap.org/{z}/{x}/{y}.png"],
        });

        // image
        that.map.addSource("testImage", {
          type: "image",
          // 两种方式：1.加载本地image  2.加载网页image
          url: require("../assets/testImage.gif"), //"https://docs.mapbox.com/mapbox-gl-js/assets/radar.gif"
          coordinates: [
            [-80.425, 46.437],
            [-71.516, 46.437],
            [-71.516, 37.936],
            [-80.425, 37.936],
          ],
        });

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

        // 灾害 - 点图层，多种图标
        // 地震
        that.map.loadImage(
          require("../assets/earthquake.png"),
          (error, image) => {
            if (error) throw error;
            that.map.addImage("earthquake", image);

            axios.get("/static/data/points.json").then((res) => {
              that.map.addLayer({
                id: "points",
                type: "symbol",
                source: {
                  type: "geojson",
                  data: res.data,
                },
                layout: {
                  "icon-image": "earthquake",
                  "icon-size": 0.25,
                },
              });
            });
          }
        );

        // 森林大火
        that.map.loadImage(
          require("../assets/forestfire.png"),
          (error, image) => {
            if (error) throw error;
            that.map.addImage("forestfire", image);

            axios.get("/static/data/forestfire_points.json").then((res) => {
              that.map.addLayer({
                id: "forestfire_points",
                type: "symbol",
                source: {
                  type: "geojson",
                  data: res.data,
                },
                layout: {
                  "icon-image": "forestfire",
                  "icon-size": 0.25,
                },
              });
            });
          }
        );

        // 暴雨
        that.map.loadImage(
          require("../assets/rainstorm.png"),
          (error, image) => {
            if (error) throw error;
            that.map.addImage("rainstorm", image);

            axios.get("/static/data/rainstorm_points.json").then((res) => {
              that.map.addLayer({
                id: "rainstorm_points",
                type: "symbol",
                source: {
                  type: "geojson",
                  data: res.data,
                },
                layout: {
                  "icon-image": "rainstorm",
                  "icon-size": 0.25,
                },
              });
            });
          }
        );

        // that.map.addLayer({
        //   id: "testImage",
        //   type: "raster",
        //   source: "testImage",
        // });

        // 读取geojson文件，加载要素
        axios.get("/static/data/boundingbox.json").then((res) => {
          that.map.addLayer({
            id: "boundingbox",
            type: "line",
            source: {
              type: "geojson",
              data: res.data,
            },
            layout: {},
            paint: {
              "line-color": "#088",
              "line-width": 1.0,
            },
          });
        });

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

      that.map.on("mouseenter", "rainstorm_points", function (e) {
        // Change the cursor style as a UI indicator.
        that.map.getCanvas().style.cursor = "pointer";

        var coordinates = e.features[0].geometry.coordinates.slice();
        var description = e.features[0].properties.description;

        console.log(description);

        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
          coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }

        // Populate the popup and set its coordinates
        // based on the feature found.
        popup.setLngLat(coordinates).setHTML(description).addTo(that.map);
      });

      that.map.on("mouseleave", "rainstorm_points", function () {
        that.map.getCanvas().style.cursor = "";
        popup.remove();
      });
    },
    updateArea(e) {
      debugger;
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
      this.draw.delete(e.features[0].id);
      console.log(this.draw);
    },
  },
};
</script>

<style scoped>
</style>
