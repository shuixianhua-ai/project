<template>
  <div id="map" style="width: 100%; height: 100%">
    <!-- <selectFrame class="frame" /> -->
  </div>
</template>
<!--script src='turf.min.js'></script>-->
<script>
//也可以全局引入 但是建议map对象还是少做传值，可以通过组件通信，统一在此处操作
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import axios from "axios";
import mapUrl from "../../disaster-display/util/mapUrl";

export default {
  name: "mainmap",
  data() {
    return {
      flag: true,
      focusDisaster: 0, // 当前map关注的灾害id
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
  mounted() {
    this.init();
  },
  methods: {
    init() {
      mapboxgl.accessToken =
        "pk.eyJ1IjoibGl5dWV5aSIsImEiOiJjanpkZmh1aGswMW91M3Bsa2ZxZmFpNGtjIn0.3O_iLJM7u3UyEyGBVKt1ug";
      var map = new mapboxgl.Map({
        container: "map",
        style: this.tianStyle,
        interactive: true,
        center: [121.64, 29.7],
        zoom: 4,
      });

      map.on("load", function () {
        // 只在地图首次加载的过程中被运行
        map.addSource("openstreetmap", {
          type: "raster",
          scheme: "xyz",
          tiles: ["https://tile.openstreetmap.org/{z}/{x}/{y}.png"],
        });

        axios.get("/static/Disaster-data/geoJson.json").then((res) => {
          var geoJson = eval("(" + res.data.geoJson + ")"); //eval("(" + res.data.geoJson + ")"); // text转换为json格式
          var geo = geoJson.coordinates[0];

          map.addLayer({
            id: "boundingbox_test",
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
                      coordinates: geo,
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
        });

        map.addLayer({
          id: "openstreetmap",
          type: "raster",
          source: "openstreetmap",
        });

        map.moveLayer("openstreetmap", "tdtvec");
      });

      map.on("zoom", function () {
        let zoom = this.map.getZoom();
        let pos = this.map.getCenter();
        var cent = [pos.lng, pos.lat];

        // 地图范围内没有中国且zoom > 8时，替换为osm底图
        if (
          zoom < 8 ||
          (cent[0] > 71 && cent[0] < 125 && cent[1] > 17 && cent[1] < 53) ||
          (cent[1] > 3 && cent[1] < 20 && cent[0] > 105 && cent[0] < 120)
        ) {
          map.moveLayer("openstreetmap", "tdtvec");
        } else {
          map.moveLayer("openstreetmap", "tdtcta");
          map.moveLayer("tdtcta", "openstreetmap");
        }
      });

      map.on("click", function () {
        console.log("点击");
      });
    },
  },
};
</script>

<style scoped>
</style>