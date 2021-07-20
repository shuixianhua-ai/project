<template>
    <div class="tags">
      <el-row>
  <el-col :span="24">
    <div class="bg-purple-dark">
      
         <el-slider
            class="slider"
            v-model="workTime"
            range
            show-stops
            :step="1"
            :max="251"
            :marks="marks"
            :format-tooltip="formatTooltip"
          >
          </el-slider>
      
      </div></el-col>
</el-row>

      
     
    </div>

</template>


<script>
function getArrayIndex(arr, obj) {
    var i = arr.length;
    while (i--) {
        if (arr[i] === obj) {
            return i;
        }
    }
    return -1;
}
const Months=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
const x = ('2021'-'2000')*12+getArrayIndex(Months,"Dev")-getArrayIndex(Months,"Jan");
var number=x.toString();
console.log(x);
export default {
  name: "filterTime",
  data() {
    return {
      marks: {
        0: "Jan,2000",

        251:"Dev,2021",
        
      },
    };
  },
  methods: {
    formatTooltip(val) {
      let month = Months[0];
      let year = 2000;
      year=parseInt(val/12);
      month=Months[val-year*12];
      year=2000+year;

      let time = month + "," + year;
      console.log(time);
      return time;
    },
  },
};
</script>

<style scoped>

.slider{
 width:80%;
 position:absolute;
 left:30px;
box-sizing: border-box;

 
 
}


.bg-purple-dark {
    
    height:55px;
  }


</style>

