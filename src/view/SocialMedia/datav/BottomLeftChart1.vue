<template>
  <div class="bottom-left-chart-1">
    <div class="header-name">Daily Disaster Heat</div> 
    <!-- <div class="details-value"><span>55.1</span>%</div> -->
    <dv-water-level-pond class="heatlevel":config="config" style="width:150px;height:200px" />
  </div>
</template>

<script>
export default {
  
  name: 'BottomLeftChart1',
  data () {
    return {
      config: {
          data: [65.1],
          shape: 'round'
      }
    }
  }
}

</script>

<style lang="less">
.bottom-left-chart-1 {
  position: relative;
  text-align: center;
  .header-name {
    margin-top: -20px;
    height: 70px;
    line-height: 150px;
    font-size: 20px;
    text-align: center;
  }

  .details-value {
    height: 40px;
    font-size: 25px;
    font-weight: bold;
    text-align: center;
    margin-top: -50px;
    span {
      color: #00c0ff;
      font-size: 30px;
    }
  }

  .dv-charts-container {
    height: calc(~"100% ");
  }

  .decoration-ring {
    position: absolute;
    width: 200px;
    height: 500px;
    border-radius: 50%;
    border: 5px solid fade(#fefefe, 30);
    top: 190px;
    left: 50%;
    transform: translateX(-50%);
  }

  .heatlevel{
    margin-top: 30px;
    margin-bottom: 10px;
    padding-bottom: 10px;
    display: inline-block;
  }
}
</style>
