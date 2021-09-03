<template>
  <div id="Weather" style="width: 100%; height: 1080px">
    <el-container>
      <el-main>
        <weatherMap @onGetCoordinates='onGetCoordinates'></weatherMap>
      </el-main>
      <el-footer>
        <weatherInfo v-bind:cor="cor"></weatherInfo>
      </el-footer>
    </el-container>
    <!--    <weatherMap :fuck="fuck" :wtype="precipitation"></weatherMap>-->
  </div>
</template>

<script>
import tinymce from '../../components/tinymce-editor/tinymce-editor'
import weatherMap from './WeatherMap'
import weatherInfo from './WeatherInfo'

export default {
  name: 'Weather',
  components: {
    tinymce,
    weatherMap: weatherMap,
    weatherInfo: weatherInfo
  },
  data () {
    return {
      fuck: 'fuck',
      clouds: 'clouds',
      precipitation: 'precipitation',
      cor: [120.1, 30.29]
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
    },
    // eslint-disable-next-line vue/no-dupe-keys
    onGetCoordinates (ncor) {
      console.log('onGetCoordinates:', ncor)
      this.cor = ncor
    }
  }
}

</script>

<style scoped>

</style>
