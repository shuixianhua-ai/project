<template>
  <div id="data-view">
      <div class="main-header">
        <div class="mh-left">GIS2018</div>
        <div class="mh-middle">Social Media Data Screen</div>
        <div class="mh-right">
          <dv-border-box-2
            style="width: 120px; height: 50px; line-height: 50px; text-align:center;margin-left:200px;"
          >
          <div @click="goOff()">
              return
          </div>

          </dv-border-box-2>
        </div>
      </div>

      <dv-border-box-1 class="main-container">
        <div class="mc-top">
          <Top-Left-Cmp />
          <Top-Middle-Cmp />
          <Top-right-Cmp />
        </div>
        <div class="mc-bottom">
          <dv-border-box-6 class="bottom-left-container">
            <dv-decoration-4 class="mcb-decoration-1" style="width:5px;height:45%;" />
            <dv-decoration-4 class="mcb-decoration-2" style="width:5px;height:45%;" />
            <Bottom-Left-Chart-1 />
            <Bottom-Left-Chart-2 />
          </dv-border-box-6>

          <div class="bottom-right-container">
            <Bottom-Right-Table-1 />
            <Bottom-Right-Table-2 />

          </div>
        </div>
      </dv-border-box-1>
  </div>
</template>

<script>
import TopLeftCmp from './TopLeftCmp'
import TopMiddleCmp from './TopMiddleCmp'
import TopRightCmp from './TopRightCmp'

import BottomLeftChart1 from './BottomLeftChart1'
import BottomLeftChart2 from './BottomLeftChart2'

import BottomRightTable1 from './BottomRightTable1'
import BottomRightTable2 from './BottomRightTable2'
import BottomRightTable3 from './BottomRightTable3'
import BottomRightTable4 from './BottomRightTable4'

export default {
  name: 'DataView',
  components: {
    TopLeftCmp,
    TopMiddleCmp,
    TopRightCmp,
    BottomLeftChart1,
    BottomLeftChart2,
    BottomRightTable1,
    BottomRightTable2,
    BottomRightTable3,
    BottomRightTable4
  },
  data () {
    return {}
  },
  methods: {
    goOff () {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="less">
#data-view {
  width: 100%;
  height: 100%;
  background-color: #030409;
  color: #fff;
  border-radius: 20px;

  #dv-full-screen-container {
    background-image: url('./img/bg.png');
    background-size: 100% 100%;
    box-shadow: 0 0 3px blue;
    display: flex;
    flex-direction: column;
  }

  .main-header {
    height: 80px;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;

    .mh-left {
      font-size: 20px;
      color: rgb(1,134,187);

      a:visited {
        color: rgb(1,134,187);
      }
    }

    .mh-middle {
      font-size: 30px;
    }

    .mh-left, .mh-right {
      width: 450px;
    }
  }

  .main-container {
    height: calc(~"100% - 80px");

    .mc-top, .mc-bottom {
      box-sizing: border-box;
      padding: 30px;
      display: flex;
    }

    .mc-top {
      height: 40%;
    }

    .mc-bottom {
      height: 60%;
    }

    .top-left-cmp, .bottom-left-container {
      width: 32%;
      height: 100%
    }

    .top-middle-cmp, .top-right-cmp {
      width: 34%;
    }

    .bottom-left-container {
      position: relative;

      .border-box-content {
        padding: 20px;
        display: flex;
      }

      .mcb-decoration-1, .mcb-decoration-2 {
        position: absolute;
        left: 50%;
        margin-left: -2px;
      }

      .mcb-decoration-1 {
        top: 5%;
        transform: rotate(180deg);
      }

      .mcb-decoration-2 {
        top: 50%;
      }

      .bottom-left-chart-1, .bottom-left-chart-2 {
        width: 50%;
        height: 100%;
      }
    }

    .bottom-right-container {
      width: 68%;
      padding-left: 30px;
      box-sizing: border-box;
      display: flex;
    }
  }
}
</style>
