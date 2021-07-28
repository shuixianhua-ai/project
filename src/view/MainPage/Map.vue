<template>
  <div id='map'></div>
</template>

<script>
// 也可以全局引入 但是建议map对象还是少做传值，可以通过组件通信，统一在此处操作
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
export default {
  name: 'Map',
  data () {
    return {}
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      mapboxgl.accessToken =
        'pk.eyJ1IjoiaHVkYW53ZWkiLCJhIjoiY2tyZDNmbGY4NTgzZjJxbzZnem1zZ21yNCJ9.WR-eaeODn3yE84w_wyvg1Q'

      var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/dark-v10',
        zoom: 1.35,
        // renderWorldCopies:false
        center: [10, 10],
        logoPosition: 'bottom-right'
      })

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

      map.on('load', function () {
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
                    description:
                      '<strong>Make it Mount Pleasant</strong><p><a href="http://www.mtpleasantdc.com/makeitmtpleasant" target="_blank" title="Opens in a new window">Make it Mount Pleasant</a> is a handmade and vintage market and afternoon of live entertainment and kids activities. 12:00-6:00 p.m.</p>',
                    icon: 'theatre'
                  },
                  geometry: {
                    type: 'Point',
                    coordinates: [0, 0]
                  }
                },
                {
                  type: 'Feature',
                  properties: {
                    description:
                      '<strong>Mad Men Season Five Finale Watch Party</strong><p>Head to Lounge 201 (201 Massachusetts Avenue NE) Sunday for a <a href="http://madmens5finale.eventbrite.com/" target="_blank" title="Opens in a new window">Mad Men Season Five Finale Watch Party</a>, complete with 60s costume contest, Mad Men trivia, and retro food and drink. 8:00-11:00 p.m. $10 general admission, $20 admission and two hour open bar.</p>',
                    icon: 'theatre'
                  },
                  geometry: {
                    type: 'Point',
                    coordinates: [230, 33]
                  }
                },
                {
                  type: 'Feature',
                  properties: {
                    description:
                      '<strong>Mad Men Season Five Finale Watch Party</strong><p>Head to Lounge 201 (201 Massachusetts Avenue NE) Sunday for a <a href="http://madmens5finale.eventbrite.com/" target="_blank" title="Opens in a new window">Mad Men Season Five Finale Watch Party</a>, complete with 60s costume contest, Mad Men trivia, and retro food and drink. 8:00-11:00 p.m. $10 general admission, $20 admission and two hour open bar.</p>',
                    icon: 'theatre'
                  },
                  geometry: {
                    type: 'Point',
                    coordinates: [112, 34]
                  }
                }
              ]
            }
          },
          layout: {
            'icon-image': 'pulsing-dot',
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
}
</style>
