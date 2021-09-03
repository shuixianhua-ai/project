<template>
  <el-container>
    <el-header>
      <el-button-group>
        <el-button type="primary" v-on:click='changeToCurrent' :disabled="qtype==='current'">Current</el-button>
        <el-button type="primary" v-on:click='changeToForecast' :disabled="qtype==='forecast'">Forecast</el-button>
      </el-button-group>
    </el-header>

    <el-container>
      <el-header v-if="qtype==='current'">
        <el-tag type="info">{{ sname }}</el-tag>
        <el-tag type="info">{{ desc }}</el-tag>
      </el-header>

      <el-header v-if="qtype==='forecast'">
        <el-button-group>
          <el-button type="primary" v-on:click='changeToHourly' :disabled="ftype==='hourly'">Hourly</el-button>
          <el-button type="primary" v-on:click='changeToDaily' :disabled="ftype==='daily'">Daily</el-button>
        </el-button-group>
      </el-header>

      <el-table :data="tableData"
                header-cell-style="background-color:#373737;color:#FFFFFF"
                cell-style="background-color:#373737;color:#FFFFFF"
      >
        <el-table-column
          prop="time"
          label="Time"
        >
        </el-table-column>
        <el-table-column
          prop="temp"
          label="Temp"
        >
        </el-table-column>
        <el-table-column
          prop="precipitation"
          label="Precipitation"
          v-if="qtype==='current'"
        >
        </el-table-column>
        <el-table-column
          prop="pressure"
          label="Pressure"
        >
        </el-table-column>
        <el-table-column
          prop="humidity"
          label="Humidity"
        >
        </el-table-column>
        <el-table-column
          prop="clouds"
          label="Clouds"
        >
        </el-table-column>
        <el-table-column
          prop="visibility"
          label="Visibility"
          v-if="qtype==='current' || ftype==='hourly'"
        >
        </el-table-column>
        <el-table-column
          prop="desc"
          label="Description"
        >
        </el-table-column>
      </el-table>
    </el-container>
  </el-container>
</template>

<script>
import axios from 'axios'

let server = 'http://116.62.228.138:10007/'

function formatDate (idate) {
  var date = new Date(idate * 1000)
  var YY = date.getFullYear() + '-'
  var MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
  var DD = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate())
  var hh = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':'
  var mm = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':'
  var ss = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds())
  return YY + MM + DD + ' ' + hh + mm + ss
}

export default {
  name: 'WeatherInfo',
  props: ['cor'],
  data () {
    return {
      qtype: 'current',
      ftype: 'hourly',
      tableData: [{
        time: '2021-08-17 14:23',
        temp: '32℃',
        precipitation: '0mm',
        pressure: '1012 hPa',
        humidity: '92%',
        clouds: '100%',
        visibility: '100%',
        desc: 'None'
      }],
      sname: 'None',
      desc: 'None'
    }
  },
  methods: {
    tableRowStyle ({row, rowIndex}) {
      console.log('tableRowStyle')
      return 'background-color:#373737;color:#CCCCCC'
    },
    tableHeaderColor ({row, column, rowIndex, columnIndex}) {
      return 'background-color:#373737'

    },
    changeToHourly () {
      this.ftype = 'hourly'
    },
    changeToDaily () {
      this.ftype = 'daily'
    },
    changeToCurrent () {
      this.qtype = 'current'
    },
    changeToForecast () {
      this.qtype = 'forecast'
    },
    query_current () {
      const self = this
      console.log('query_current', this.cor)
      axios.post(server + 'weather-current', {
        'position': {
          'lon': this.cor[0],
          'lat': this.cor[1]
        }
      }).then(function (response) {
        console.log(response)
        let d = response.data
        self.tableData = [{
          time: formatDate(d['dt']),
          temp: (d['main']['temp'] - 273.15).toFixed(1) + '℃',
          precipitation: (function () {
            if (d['rain']) {
              return d['rain']['1h']
            } else if (d['snow']) {
              return d['snow']['1h']
            } else {
              return '0'
            }
          }()) + 'mm',
          pressure: d['main']['pressure'] + 'Pa',
          humidity: d['main']['humidity'] + '%',
          clouds: d['clouds']['all'] + '%',
          visibility: (d['visibility'] / 100.0).toFixed(1) + '%',
          desc: d['weather'][0]['description']
        }]
        if (d['name']) {
          self.sname = d['name']
        } else {
          self.sname = 'Ocean'
        }
        self.desc = d['weather'][0]['main'] + ': ' + d['weather'][0]['description']
      }).catch(function (error) {
        console.log(error)
      })
    },
    query_forecast () {
      const self = this
      console.log('query_forcast', this.cor)
      axios.post(server + 'weather-forecast', {
        'position': {
          'lon': this.cor[0],
          'lat': this.cor[1]
        }
      }).then(function (response) {
        console.log(response)
        self.respcache = response.data
        if (self.ftype === 'hourly') {
          let hourly = response.data['hourly']
          self.tableData = []
          hourly.forEach((ahour) => {
            console.log(ahour)
            let d = ahour
            self.tableData = self.tableData.concat({
              time: formatDate(d['dt']),
              temp: (d['temp'] - 273.15).toFixed(1) + '℃',
              pressure: d['pressure'] + 'hPa',
              humidity: d['humidity'] + '%',
              clouds: d['clouds'] + '%',
              visibility: (d['visibility'] / 100.0).toFixed(1) + '%',
              desc: d['weather'][0]['description']
            })
          })
        } else {
          let daily = response.data['daily']
          self.tableData = []
          daily.forEach((aday) => {
            console.log(aday)
            let d = aday
            self.tableData = self.tableData.concat({
              time: formatDate(d['dt']),
              temp: ((d['temp']['min'] - 273.15).toFixed(1)) + '℃-' + ((d['temp']['max'] - 273.15).toFixed(1)) + '℃',
              pressure: d['pressure'] + 'hPa',
              humidity: d['humidity'] + '%',
              clouds: d['clouds'] + '%',
              visibility: '',
              desc: d['weather'][0]['description']
            })
          })
        }
      }).catch(function (error) {
        console.log(error)
      })
    },
  },
  watch: {
    ftype (val, oldVal) {
      let self = this
      if (val === 'hourly') {
        let hourly = self.respcache['hourly']
        self.tableData = []
        hourly.forEach((ahour) => {
          console.log(ahour)
          let d = ahour
          self.tableData = self.tableData.concat({
            time: formatDate(d['dt']),
            temp: (d['temp'] - 273.15).toFixed(1) + '℃',
            pressure: d['pressure'] + 'hPa',
            humidity: d['humidity'] + '%',
            clouds: d['clouds'] + '%',
            visibility: (d['visibility'] / 100.0).toFixed(1) + '%',
            desc: d['weather'][0]['description']
          })
        })
      } else {
        let daily = self.respcache['daily']
        self.tableData = []
        daily.forEach((aday) => {
          console.log(aday)
          let d = aday
          self.tableData = self.tableData.concat({
            time: formatDate(d['dt']),
            temp: ((d['temp']['min'] - 273.15).toFixed(1)) + '℃-' + ((d['temp']['max'] - 273.15).toFixed(1)) + '℃',
            pressure: d['pressure'] + 'hPa',
            humidity: d['humidity'] + '%',
            clouds: d['clouds'] + '%',
            visibility: '',
            desc: d['weather'][0]['description']
          })
        })
      }
    },
    qtype (val, oldval) {
      if (val === 'current') {
        this.query_current(this.cor)
      } else {
        this.query_forecast(this.cor)
      }
    },
    cor (val, oldval) {
      if (this.qtype === 'current') {
        this.query_current(this.val)
      } else {
        this.query_forecast(this.cor)
      }
    }
  }

}
</script>

<style scoped>
button {
  /*position: absolute;*/
  background-color: #373737;
  color: #ffffff;
  border-color: #ffffff;
}

button:disabled {
  /*position: absolute;*/
  background-color: #ffffff;
  color: #373737;
  border-color: #ffffff;
}

button:hover {
  /*position: absolute;*/
  background-color: #ffffff;
  color: #373737;
  border-color: #ffffff;
}

</style>
