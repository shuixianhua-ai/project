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
let storage = window.localStorage

export default {
  components: { Response },
  name: 'Map',
  data () {
    return {
      type:storage['type'],
      datasource: {}
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    loadData () {
      console.log(storage['type'], 2222)
      // console.log(datasource)
    },
    init () {
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
          console.log(res.data.data, 'data.data')
          mydata.datasource = res.data.data
          // console.log(mydata.datasource, 'datasource1')
          mystorage=res.data.data
        })
      mapboxgl.accessToken =
        'pk.eyJ1IjoiaHVkYW53ZWkiLCJhIjoiY2tyZDNmbGY4NTgzZjJxbzZnem1zZ21yNCJ9.WR-eaeODn3yE84w_wyvg1Q'
      let localhost = window.location.origin
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
      var map = new mapboxgl.Map({
        container: 'map',
        // style: 'mapbox://styles/mapbox/dark-v10',
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
      // mapboxgl.setRTLTextPlugin('https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.1.0/mapbox-gl-rtl-text.js');
      // map.addControl(new MapboxLanguage({
      //       defaultLanguage: 'en'
      //   }));

      var size = 200

      var pulsingDot = {
        width: size,
        height: size,
        data: new Uint8Array(size * size * 4),

        onAdd: function () {
          var canvas = document.createElement('canvas')
          canvas.width = this.width
          canvas.height = this.height
          this.context = canvas.getContext('2d')
        },

        render: function () {
          var duration = 1000
          var t = (performance.now() % duration) / duration

          var radius = (size / 2) * 0.3
          var outerRadius = (size / 2) * 0.7 * t + radius
          var context = this.context

          // draw outer circle
          context.clearRect(0, 0, this.width, this.height)
          context.beginPath()
          context.arc(
            this.width / 2,
            this.height / 2,
            outerRadius,
            0,
            Math.PI * 2
          )
          context.fillStyle = 'rgba(255, 200, 200,' + (1 - t) + ')'
          context.fill()

          // draw inner circle
          context.beginPath()
          context.arc(this.width / 2, this.height / 2, radius, 0, Math.PI * 2)
          context.fillStyle = 'rgba(255, 100, 100, 1)'
          context.strokeStyle = 'white'
          context.lineWidth = 2 + 4 * (1 - t)
          context.fill()
          context.stroke()

          // update this image's data with data from the canvas
          this.data = context.getImageData(0, 0, this.width, this.height).data

          // keep the map repainting
          map.triggerRepaint()

          // return `true` to let the map know that the image was updated
          return true
        }
      }

      
      var id = 'Response';

      var link = document.createElement('a');
      link.href = '#';
      link.className = 'active';

      link.onclick = function (e) {
          console.log("respon 方法")
      };

      var responseLayers = document.getElementById('menu');
      responseLayers.appendChild(link);
      
      //加载图层
      map.on('load', function () {
        console.log('test')
        map.addImage('pulsing-dot', pulsingDot, { pixelRatio: 2 })
        map.addLayer({
          id: 'places',
          type: 'symbol',
          source: {
            type: 'geojson',
            data: {
              type: 'FeatureCollection',
              features: [
                {
                  type: 'Feature',
                  properties: {
                    description: `<strong>${mydata.datasource[0].name}</strong><p style="text-align:left"><b >Sponsor: </b>${mydata.datasource[0].sponsor}</p><p style="text-align:left"><strong>Responsor: </strong>${mydata.datasource[0].responsor}</strong><p style="text-align:left"><strong >StartTime: </strong>${mydata.datasource[0].startTime}</p><p style="text-align:left"><strong>EndTime: </strong>${mydata.datasource[0].endTime}</p><a href="http://madmens5finale.eventbrite.com/" target="_blank" title="Opens in a new window">Get more Details</a> `,
                    icon: 'monument'
                  },
                  geometry: {
                    type: 'Point',
                    coordinates: [mydata.datasource[0].lon, mydata.datasource[0].lat]
                  }
                },
                {
                  type: 'Feature',
                  properties: {
                    description: `<strong>${mydata.datasource[1].name}</strong><p style="text-align:left"><b >Sponsor: </b>${mydata.datasource[1].sponsor}</p><p style="text-align:left"><strong>Responsor: </strong>${mydata.datasource[1].responsor}</strong><p style="text-align:left"><strong >StartTime: </strong>${mydata.datasource[1].startTime}</p><p style="text-align:left"><strong>EndTime: </strong>${mydata.datasource[1].endTime}</p><a href="http://madmens5finale.eventbrite.com/" target="_blank" title="Opens in a new window">Get more Details</a> `,
                    icon: 'harbor'
                  },
                  geometry: {
                    type: 'Point',
                    coordinates: [mydata.datasource[1].lon, mydata.datasource[1].lat]
                  }
                },
                {
                  type: 'Feature',
                  properties: {
                    description:
                      `<strong>${mydata.datasource[2].name}</strong><p>${mydata.datasource[2].description}</p><a href="http://madmens5finale.eventbrite.com/" target="_blank" title="Opens in a new window">Get more Details</a> `,
                       icon: 'theatre'
                  },
                  geometry: {
                    type: 'Point',
                    coordinates: [mydata.datasource[2].lon, mydata.datasource[2].lat]
                  }
                }
              ]
            }
          },
          layout: {
            'icon-image': '{icon}-15',
            'icon-allow-overlap': true
             
          }
        })
        
        // When a click event occurs on a feature in the places layer, open a popup at the
        // location of the feature, with description HTML from its properties.
        map.on('click', 'places', function (e) {
          var coordinates = e.features[0].geometry.coordinates.slice()
          var description = e.features[0].properties.description

          // Ensure that if the map is zoomed out such that multiple
          // copies of the feature are visible, the popup appears
          // over the copy being pointed to.
          while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360
          }

          new mapboxgl.Popup()
            .setLngLat(coordinates)
            .setHTML(description)
            .addTo(map)
        })

        // Change the cursor to a pointer when the mouse is over the places layer.
        map.on('mouseenter', 'places', function () {
          map.getCanvas().style.cursor = 'pointer'
        })

        // Change it back to a pointer when it leaves.
        map.on('mouseleave', 'places', function () {
          map.getCanvas().style.cursor = ''
        })
      })
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
        console.log(mydata.datasource, 'datasourece2last')
      })
      
    }
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
