<template>
  <div class="bottom-right-table-2">
    <dv-border-box-6 class="box">
      <div class="table-name">
        <img src="./img/icon2.png" />Heated User Rank
      </div>

      <dv-scroll-board :config="config" />
    </dv-border-box-6>
  </div>
</template>

<script>
export default {
  name: 'BottomRightTable2',
  data () {
    return {
      config: {
        data: [
          ['User1', 'Number of Twitter：56'],
          ['User2', 'Number of Twitter：56'],
          ['User3', 'Number of Twitter：56'],
          ['User4', 'Number of Twitter：56'],
          ['User5', 'Number of Twitter：56'],
          ['User6', 'Number of Twitter：56']
        ],
        index: true,
        columnWidth: [30, 100],
        align: ['center'],
        oddRowBGC: 'rgba(9, 37, 50, 0.4)',
        evenRowBGC: 'rgba(10, 32, 50, 0.3)'
      }
    }
  }
}
</script>

<style lang="less">
.bottom-right-table-2 {
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
