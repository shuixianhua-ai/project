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
import mapUrl from "../../disaster-display/util/mapUrl";
import axios from "axios";

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
        style: "mapbox://styles/mapbox/dark-v10",
        interactive: true,
        center: [-120, 50],
        zoom: 2,
      });

      map.on("load", function () {
        // Add a geojson point source.
        // Heatmap layers also work with a vector tile source.
        map.addSource("trees", {
          type: "geojson",
          data: "https://docs.mapbox.com/mapbox-gl-js/assets/earthquakes.geojson",
        });

        //add heaplayer
        map.addLayer(
          {
            id: "trees-heat",
            type: "heatmap",
            source: "trees",
            maxzoom: 15,
            paint: {
              // increase weight as diameter breast height increases
              "heatmap-weight": {
                property: "dbh",
                type: "exponential",
                stops: [
                  [1, 0],
                  [62, 1],
                ],
              },
              // increase intensity as zoom level increases
              "heatmap-intensity": {
                stops: [
                  [11, 1],
                  [15, 3],
                ],
              },
              // assign color values be applied to points depending on their density
              "heatmap-color": [
                "interpolate",
                ["linear"],
                ["heatmap-density"],
                0,
                "rgba(236,222,239,0)",
                0.2,
                "rgb(208,209,230)",
                0.4,
                "rgb(166,189,219)",
                0.6,
                "rgb(103,169,207)",
                0.8,
                "rgb(28,144,153)",
              ],
              // increase radius as zoom increases
              "heatmap-radius": {
                stops: [
                  [11, 15],
                  [15, 20],
                ],
              },
              // decrease opacity to transition into the circle layer
              "heatmap-opacity": {
                default: 1,
                stops: [
                  [14, 1],
                  [15, 0],
                ],
              },
            },
          }
          //"waterway-label"
        );

        //add circle layer
        map.addLayer(
          {
            id: "trees-point",
            type: "circle",
            source: "trees",
            minzoom: 14,
            paint: {
              // increase the radius of the circle as the zoom level and dbh value increases
              "circle-radius": {
                property: "dbh",
                type: "exponential",
                stops: [
                  [{ zoom: 15, value: 1 }, 5],
                  [{ zoom: 15, value: 62 }, 10],
                  [{ zoom: 22, value: 1 }, 20],
                  [{ zoom: 22, value: 62 }, 50],
                ],
              },
              "circle-color": {
                property: "dbh",
                type: "exponential",
                stops: [
                  [0, "rgba(236,222,239,0)"],
                  [10, "rgb(236,222,239)"],
                  [20, "rgb(208,209,230)"],
                  [30, "rgb(166,189,219)"],
                  [40, "rgb(103,169,207)"],
                  [50, "rgb(28,144,153)"],
                  [60, "rgb(1,108,89)"],
                ],
              },
              "circle-stroke-color": "white",
              "circle-stroke-width": 1,
              "circle-opacity": {
                stops: [
                  [14, 0],
                  [15, 1],
                ],
              },
            },
          }
          //"waterway-label"
        );
      });
      // click on tree to view dbh in a popup
      map.on("click", "trees-point", ({ features }) => {
        new mapboxgl.Popup()
          .setLngLat(features[0].geometry.coordinates)
          .setHTML(`<strong>DBH:</strong> ${features[0].properties.dbh}`)
          .addTo(map);
      });
    },
  },
};
</script>

<style scoped>
</style>