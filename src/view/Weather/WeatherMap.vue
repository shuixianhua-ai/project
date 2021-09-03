<template>
  <div>
    <!-- <nav id="menu" v-if="2==2"></nav> -->
    <el-container>
      <el-header height="100px">
        <el-button-group>
          <el-button type="primary" v-on:click='setWeatherTypeClouds' :disabled="wtype==='clouds'">Clouds</el-button>
          <el-button type="primary" v-on:click='setWeatherTypePrecipitation' :disabled="wtype==='precipitation'">
            Precipitation
          </el-button>
          <el-button type="primary" v-on:click='setWeatherTypePressure' :disabled="wtype==='pressure'">Pressure
          </el-button>
          <el-button type="primary" v-on:click='setWeatherTypeWind' :disabled="wtype==='wind'">Wind</el-button>
          <el-button type="primary" v-on:click='setWeatherTypeTemp' :disabled="wtype==='temp'">Temperature</el-button>
        </el-button-group>
      </el-header>

      <div id='map'></div>
      <pre id="coordinates" class="coordinates" style="display:none" ></pre>
    </el-container>
  </div>
</template>

<script>
// 也可以全局引入 但是建议map对象还是少做传值，可以通过组件通信，统一在此处操作
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

let storage = window.localStorage

export default {
  components: {},
  props: ['fuck'],
  name: 'Map',
  data () {
    return {
      type: storage['type'],
      datasource: {},
      wtype: 'clouds'
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
      const self = this
      console.log('fucking:' + this.fuck + this.wtype)
      var url = 'https://webapi.amap.com/maps?v=1.4.15&key=69af142a5df4feb0d3149bd89f2a0901&callback=onLoad'
      var jsapi = document.createElement('script')
      jsapi.charset = 'utf-8'
      jsapi.src = url

      mapboxgl.accessToken =
        'pk.eyJ1IjoiaHVkYW53ZWkiLCJhIjoiY2tyZDNmbGY4NTgzZjJxbzZnem1zZ21yNCJ9.WR-eaeODn3yE84w_wyvg1Q'

      const geojson = {
        'type': 'FeatureCollection',
        'features': [
          {
            'type': 'Feature',
            'geometry': {
              'type': 'Point',
              'coordinates': [120.15, 30.29]
            }
          }
        ]
      }

      this.sources = {
        'osm-tiles1-dark': {
          'type': 'raster',
          'tiles': [
            'http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetPurplishBlue/MapServer/tile/{z}/{y}/{x}'
          ],
          'tileSize': 256
        },
        'osm-tiles2-dark': {
          'type': 'raster',
          'tiles': [
            'http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetPurplishBlue/MapServer/tile/{z}/{y}/{x}'
          ],
          'tileSize': 256
        },
        'osm-tiles1-gray': {
          'type': 'raster',
          'tiles': [
            'http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetGray/MapServer/tile/{z}/{y}/{x}'
          ],
          'tileSize': 256
        },
        'osm-tiles2-gray': {
          'type': 'raster',
          'tiles': [
            'http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineStreetGray/MapServer/tile/{z}/{y}/{x}'
          ],
          'tileSize': 256
        },
        'weather-clouds': {
          'type': 'raster',
          'tiles': [
            'http://tile.openweathermap.org/map/clouds_new/{z}/{x}/{y}.png?appid=bc7b2a97e607a674af05e44fca96c438'
          ],
          'tileSize': 256
        },
        'weather-precipitation': {
          'type': 'raster',
          'tiles': [
            'http://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=bc7b2a97e607a674af05e44fca96c438'
          ],
          'tileSize': 256
        },
        'weather-pressure': {
          'type': 'raster',
          'tiles': [
            'http://tile.openweathermap.org/map/pressure_new/{z}/{x}/{y}.png?appid=bc7b2a97e607a674af05e44fca96c438'
          ],
          'tileSize': 256
        },
        'weather-wind': {
          'type': 'raster',
          'tiles': [
            'http://tile.openweathermap.org/map/wind_new/{z}/{x}/{y}.png?appid=bc7b2a97e607a674af05e44fca96c438'
          ],
          'tileSize': 256
        },
        'weather-temp': {
          'type': 'raster',
          'tiles': [
            'http://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=bc7b2a97e607a674af05e44fca96c438'
          ],
          'tileSize': 256
        },
        'point': {
          'type': 'geojson',
          'data': geojson
        }
      }

      this.base_layers_dark = [{
        'id': 'simple-tiles1',
        'type': 'raster',
        'source': 'osm-tiles1-dark'
      },
        {
          'id': 'simple-tiles2',
          'type': 'raster',
          'source': 'osm-tiles2-dark'
        }
      ]
      this.base_layers_gray = [{
        'id': 'simple-tiles1',
        'type': 'raster',
        'source': 'osm-tiles1-gray'
      },
        {
          'id': 'simple-tiles2',
          'type': 'raster',
          'source': 'osm-tiles2-gray'
        }
      ]

      this.weather_layers = {
        'clouds': {
          'id': 'weather',
          'type': 'raster',
          'source': 'weather-clouds'
        },
        'precipitation': {
          'id': 'weather',
          'type': 'raster',
          'source': 'weather-precipitation'
        },
        'pressure': {
          'id': 'weather',
          'type': 'raster',
          'source': 'weather-pressure'
        },
        'wind': {
          'id': 'weather',
          'type': 'raster',
          'source': 'weather-wind'
        },
        'temp': {
          'id': 'weather',
          'type': 'raster',
          'source': 'weather-temp'
        }
      }
      this.map = new mapboxgl.Map({
        container: 'map',
        // style: 'mapbox://styles/mapbox/dark-v10',
        zoom: 9,
        maxZoom: 15,
        minZoom: 1,
        // renderWorldCopies:false
        center: [120.15, 30.29],
        logoPosition: 'bottom-right',
        style: {
          'version': 8,
          'sprite': 'mapbox://sprites/mapbox/streets-v8',
          'glyphs': this.localhost + '/MapBoxGL/css/font/{fontstack}/{range}.pbf',
          'sources': this.sources,
          'layers': this.selectByWeatherInfoType(this.wtype).concat(this.weather_layers[this.wtype]).concat(
            {
              'id': 'point',
              'type': 'circle',
              'source': 'point',
              'paint': {
                'circle-radius': 10,
                'circle-color': '#F84C4C' // red color
              }
            }
          )
        }

      })

      let map = this.map
      const canvas = map.getCanvasContainer()

      function onMove (e) {
        const coords = e.lngLat

// Set a UI indicator for dragging.
        canvas.style.cursor = 'grabbing'

// Update the Point feature in `geojson` coordinates
// and call setData to the source layer `point` on it.
        geojson.features[0].geometry.coordinates = [coords.lng, coords.lat]
        map.getSource('point').setData(geojson)
      }

      function onUp (e) {
        const coords = e.lngLat

// Print the coordinates of where the point had
// finished being dragged to on the map.
//         coordinates.style.display = 'block'
        coordinates.innerHTML = `Longitude: ${coords.lng}<br />Latitude: ${coords.lat}`
        self.$emit('onGetCoordinates', [coords.lng, coords.lat])
        canvas.style.cursor = ''

// Unbind mouse/touch events
        map.off('mousemove', onMove)
        map.off('touchmove', onMove)
      }

      // 加载图层
      map.on('load', function () {
        // map.addSource('point', {
        //   'type': 'geojson',
        //   'data': geojson
        // })
        // console.log('map on load, will add layer point')
        // map.addLayer({
        //   'id': 'point',
        //   'type': 'circle',
        //   'source': 'point',
        //   'paint': {
        //     'circle-radius': 10,
        //     'circle-color': '#F84C4C' // red color
        //   }
        // })

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

        map.on('mouseenter', 'point', () => {
          map.setPaintProperty('point', 'circle-color', '#3bb2d0')
          canvas.style.cursor = 'move'
        })

        map.on('mouseleave', 'point', () => {
          map.setPaintProperty('point', 'circle-color', '#F84C4C')
          canvas.style.cursor = ''
        })

        map.on('mousedown', 'point', (e) => {
// Prevent the default map drag behavior.
          e.preventDefault()

          canvas.style.cursor = 'grab'

          map.on('mousemove', onMove)
          map.once('mouseup', onUp)
        })

        map.on('touchstart', 'point', (e) => {
          if (e.points.length !== 1) return

// Prevent the default map drag behavior.
          e.preventDefault()

          map.on('touchmove', onMove)
          map.once('touchend', onUp)
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
      })

      map.on('click', (e) => {
        console.log(e)
      })

    },
    selectByWeatherInfoType (wit) {
      if (wit === 'clouds') {
        return this.base_layers_dark
      } else {
        return this.base_layers_gray
      }
    },
    setWeatherTypeClouds () {
      this.wtype = 'clouds'
    },
    setWeatherTypePrecipitation () {
      this.wtype = 'precipitation'
    },
    setWeatherTypePressure () {
      this.wtype = 'pressure'
    },
    setWeatherTypeWind () {
      this.wtype = 'wind'
    },
    setWeatherTypeTemp () {
      this.wtype = 'temp'
    },
  },
  watch: {
    wtype (newVal, oldVal) {
      this.map.setStyle({
        'version': 8,
        'sprite': 'mapbox://sprites/mapbox/streets-v8',
        'glyphs': this.localhost + '/MapBoxGL/css/font/{fontstack}/{range}.pbf',
        'sources': this.sources,
        'layers': this.selectByWeatherInfoType(this.wtype).concat(this.weather_layers[this.wtype]).concat(
          {
            'id': 'point',
            'type': 'circle',
            'source': 'point',
            'paint': {
              'circle-radius': 10,
              'circle-color': '#F84C4C' // red color
            }
          }
        )
      })
    }
  }
}
</script>

<style scoped>
#map {
  bottom: 0;
  width: 100%;
  height: 400px;
}

button {
  /*position: absolute;*/
  margin: 40px;
  background-color: #373737;
  color: #ffffff;
  border-color: #ffffff;
}

button:disabled {
  /*position: absolute;*/
  margin: 40px;
  background-color: #ffffff;
  color: #373737;
  border-color: #ffffff;
}

button:hover {
  /*position: absolute;*/
  margin: 40px;
  background-color: #ffffff;
  color: #373737;
  border-color: #ffffff;
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
  border: 1px solid rgba(0, 0, 0, 0.4);
  font-family: 'Open Sans', sans-serif;
  line-height: 50px;
}

.coordinates {
  background: rgba(0, 0, 0, 0.5);
  color: #fff;
  position: absolute;
  bottom: 40px;
  left: 10px;
  padding: 5px 10px;
  margin: 0;
  font-size: 11px;
  line-height: 18px;
  border-radius: 3px;
  display: none;
}

</style>
