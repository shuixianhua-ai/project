<template>
  <div id="baseLayout">
    <el-container>
      <el-header style="padding: 0 20px">
        <headOfPage> </headOfPage>
      </el-header>
      <el-container>
        <el-aside style="width: 400px">
          <el-tabs
            v-model="activeName1"
            type="border-card"
            @tab-click="handleClick"
          >
            <el-tab-pane
              label="Activation"
              name="Activation"
              :style="{ height: tagcontentheight }"
            >
              <!-- 1.“灾害”过滤与显示模块 -->
              <filterOfDisaster />
            </el-tab-pane>
            <!-- 动态设置组件高度，使得能够填充页面 -->
            <el-tab-pane
              label="Acquisitions"
              name="Acquisitions"
              :style="{ height: tagcontentheight }"
            >
              <!-- 2.“遥感影像”过滤与显示模块 -->
              <filterOfPictures />
            </el-tab-pane>
            <el-tab-pane
              label="Products"
              name="Products"
              :style="{ height: tagcontentheight }"
            >
              <!-- 3.“灾害响应产品”模块 -->
              <productofPage />
            </el-tab-pane>
          </el-tabs>
        </el-aside>
        <el-container>
          <el-main>
            <mainmap></mainmap>
          </el-main>
        </el-container>
      </el-container>
      <!-- 以空白footer组件的形式留出页边距 -->
      <el-footer style="height: 20px"></el-footer>
    </el-container>
  </div>
</template>

<script>
import mainmap from "./mainpage";
import filterOfPictures from "./FilterImage";
import filterOfDisaster from "./FilterDisaster.vue";
import productofPage from "./Products";

export default {
  name: "baseLayout",
  data() {
    return {
      activeName1: "Activation",
      tagcontentheight: "", //作为传递动态获取浏览器页面高度的参数
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      //动态获取浏览器页面高度body.clientheight，减去公共和本页header分别占用80px、60px
      this.tagcontentheight =
        `${document.documentElement.clientHeight}` - 140 + "px";
    },
    handleClick(tab, event) {},
  },
  components: {
    mainmap: mainmap, // 主地图组件
    filterOfPictures: filterOfPictures, // 影像过滤组件
    filterOfDisaster: filterOfDisaster, // 灾害过滤组件
    productofPage: productofPage, // 灾害响应产品组件
  },
};
</script>

<style>
html,
body,
#baseLayout {
  height: 100%;
}
.el-container {
  padding: 0px;
  margin: 0px;
  height: 100%;
  /* background-color: #606266; */
}
.el-header {
  padding: 40px 70px;
}
.el-footer {
  background-color: #333;
  color: #333;
  text-align: center;
}

.el-aside {
  background-color: #333;
  color: #333;
  text-align: center;
  height: 100%;
  overflow: auto;
}

.el-main {
  background-color: #333;
  color: #333;
  text-align: center;
  height: 100%;
  padding: 0px 20px;
  overflow: visible;
}
body > .el-container {
  margin-bottom: 40px;
}
.el-col {
  /* padding: 10px; */
  border-radius: 4px;
  /* line-height: 20px; */
}
.image {
  width: 100%;
  display: block;
}

/* el-aside侧边栏风格更改 */
/* 选项卡 */
.el-tabs--border-card {
  background-color: #2d2d2d;
  border: 1px solid #000000;
}
.el-tabs--border-card > .el-tabs__header {
  background-color: #2d2d2d;
  border-bottom: 1px solid #ababab;
}
.el-tabs--border-card > .el-tabs__header .el-tabs__item.is-active {
  background-color: #2d2d2d;
}
.el-tabs--border-card > .el-tabs__header .el-tabs__item {
  color: #ffffff;
}
/* 折叠面板头部 */
.el-collapse-item__header {
  background-color: #2d2d2d;
  color: #ffffff;
  border-bottom: 1px solid #ababab;
}
.el-collapse-item__wrap {
  background-color: #2d2d2d;
  border-bottom: 1px solid #ababab;
}
/* 折叠面板内容文字颜色 */
.el-checkbox {
  color: #ffffff;
}
/* 时间轴标签颜色 */
.el-slider__marks-text {
  color: #ffffff;
}
/* Product 表单 */
.el-table {
  background-color: #2d2d2d;
  color: #ffffff;
}
.el-table thead {
  color: #ffffff;
}
.el-table th,
.el-table tr {
  background-color: #2d2d2d;
}
/* 鼠标悬停时样式 */
.el-table--enable-row-hover .el-table__body tr:hover > td {
  background-color: #000000;
}
/* 弹出对话框的样式 */
.el-dialog {
  background-color: #2d2d2d;
}
.el-dialog__title {
  color: #ffffff;
}
/* 右上角叉号 */
.el-dialog__headerbtn .el-dialog__close {
  color: #ababab;
}
.el-dialog__body {
  color: #ffffff;
}
/* overview */
.el-card {
  background-color: #2d2d2d;
  border: 1px solid #000000;
  color: #ffffff;
}
.el-card.is-always-shadow {
  box-shadow: 0 2px 12px 0 rgb(255 255 255 / 90%);
}
.el-carousel__mask {
  background-color: #2d2d2d;
}
</style>
