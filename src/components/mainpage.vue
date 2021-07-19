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

export default {
  name: "mainmap",
  data() {
    return {
      map: {}, // map 主变量属性
      draw: {},
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
        that.map.addSource("openstreetmap", {
          type: "raster",
          scheme: "xyz",
          tiles: ["https://tile.openstreetmap.org/{z}/{x}/{y}.png"],
        });
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
        that.map.addLayer({
          id: "testImage",
          type: "raster",
          source: "testImage",
        });
        that.map.addLayer({
          id: "openstreetmap",
          type: "raster",
          source: "openstreetmap",
        });

        that.map.moveLayer("openstreetmap", "tdtvec");
      });

      this.map.on("zoom", function () {
        let zoom = that.map.getZoom();
        if (zoom < 8) {
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
