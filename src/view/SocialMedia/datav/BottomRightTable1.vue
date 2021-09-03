<template>
  <div class="bottom-right-table-1">
    <dv-border-box-6 class="box">
      <div class="table-name">
        <img src="./img/icon1.png" /> Heated Words
      </div>

      <dv-scroll-ranking-board :config="config" style="width:100%;height:65%" />
    </dv-border-box-6>
  </div>
</template>

<script>
export default {
  name: 'BottomRightTable1',
  data () {
    return {
      config: {
        data: [
          {
            name: 'floods',
            value: 105
          },
          {
            name: 'landslides',
            value: 72
          },
          {
            name: 'rains',
            value: 57
          },
          {
            name: 'dead',
            value: 53
          },
          {
            name: 'trigger',
            value: 51
          },
          {
            name: 'kill',
            value: 39
          },
          {
            name: 'people',
            value: 31
          }
        ],
        index: true,
      }
    }
  }
}
</script>

<style lang="less">
.bottom-right-table-1 {
  width: calc(~"50% + 10px");
  height: 100%;
  margin: 0 -5px;

  .border-box-content {
    padding: 20px;
    box-sizing: border-box;
  }

  .table-name {
    height: 45px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 15px;

    img {
      width: 40px;
      height: 40px;
      margin-right: 5px;
    }
  }
  .box{
    width: calc(~"100% - 20px");
  }
  .dv-scroll-board {
    height: calc(~"100% - 60px");
  }
}
</style>
