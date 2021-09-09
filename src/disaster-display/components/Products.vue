<template>
  <div id="product">
    <el-table
      :data="showData"
      ref="multipleTable"
      @selection-change="handleSelectionChange"
      style="width: 100%"
    >
      <el-table-column type="selection" align="center" width="55">
      </el-table-column>
      <el-table-column prop="name" label="product" width="120">
      </el-table-column>
      <el-table-column prop="disaster" label="disaster"> </el-table-column>
    </el-table>
    <div style="margin: 30px 0"></div>
    <el-button size="small" round icon="el-icon-upload2">Upload</el-button>
    <el-button
      size="small"
      round
      @click="dialogVisible = true"
      icon="el-icon-reading"
      >Display</el-button
    >
    <el-button
      size="small"
      round
      icon="el-icon-download"
      @click="downloadClick(multipleTable)"
      >Download</el-button
    >
    <el-dialog
      title="Activation: 719"
      :visible.sync="dialogVisible"
      width="70%"
      :before-close="handleClose"
    >
      <div>
        PRELIMINARY SATELLITE-DERIVED DAMAGE ASSESSMENT, BANG PHLI DISTRICT,
        SAMUT PRAKAN PROVINCE, THAILAND
      </div>
      <div style="margin: 15px 0"></div>
      <el-tabs
        v-model="activeName1"
        type="border-card"
        @tab-click="handleClick"
      >
        <el-tab-pane label="Overview">
          <el-carousel
            type="card"
            arrow="always"
            :loop="false"
            :initial-index="0"
            indicator-position="outside"
            :autoplay="false"
            :span="24"
            @change="getChange"
          >
            <el-carousel-item
              v-for="(items, index) in multipleTable"
              :key="index"
            >
              <el-row>
                <el-col :span="24">
                  <el-card
                    :body-style="{ padding: '0px' }"
                    class="card"
                    align="center"
                  >
                    <img
                      :src="
                        require('../assets/disaster-product-img/product' +
                          (index + 1) +
                          '.jpg')
                      "
                      class="image"
                    />
                  </el-card>
                </el-col>
              </el-row>
            </el-carousel-item>
          </el-carousel>
          <el-card :body-style="{ padding: '0px' }">
            <span v-show="desOfCarousel.length > 0">{{ desOfCarousel }}</span>
          </el-card>
        </el-tab-pane>
        <el-tab-pane label="Sources">
          <el-table :data="multipleTable" style="width: 100%">
            <el-table-column prop="date" label="date" width="120">
            </el-table-column>
            <el-table-column prop="name" label="product" width="120">
            </el-table-column>
            <el-table-column prop="disaster" label="disaster">
            </el-table-column>
            <el-table-column prop="sponsor" label="sponsor"> </el-table-column>
            <el-table-column prop="producer" label="producer">
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="dialogVisible = false">OK</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import bus from "./eventBus";
import axios from "axios";

export default {
  name: "productofPage",
  data() {
    return {
      activeName1: "Overview",
      dialogVisible: false,
      multipleTable: [],
      desOfCarousel: [],
      focusDisaster: 1,
      tableData: [], // 读取的所有灾害Product data
      showData: [], // 展示所选灾害的Product data
    };
  },
  created() {},
  watch: {
    multipleTable(o, n) {
      if (o.length > 0) this.desOfCarousel = o[0].description;
      else this.desOfCarousel = [];
    },
    deep: true,
    immediate: true,
  },
  mounted() {
    this.init();

    var self = this;
    bus.$on("ProductOfDisaster", function (did) {
      self.focusDisaster = did;

      self.showData = [];
      for (let i = 0; i < self.tableData.length; i++) {
        if (self.tableData[i].did == did) {
          self.showData.push(self.tableData[i]);
        }
      }
    });
  },
  methods: {
    init() {
      /* 获取灾害响应产品数据 */
      axios({
        url: "http://116.62.228.138:10003/disasterProduct/GetProducts",
        method: "get",
      }).then((res) => {
        var len = res.data.data.length;
        var product_data = res.data.data;
        let totalNum = 0;
        product_data = product_data.filter((item) => item.description != null); // 过滤description不为空的数据
        for (let i = 0; i < len; i++) {
          let id = product_data[i].id;
          this.tableData.push({
            id: id,
            did: product_data[i].did,
            date: product_data[i].date,
            name: "Product" + id,
            disaster: product_data[i].disaster,
            sponsor: product_data[i].sponsor,
            producer: product_data[i].producer,
            description: product_data[i].description,
          });
        }

        this.showData = this.tableData; // 模块初始展示所有获取的灾害响应数据
      });
    },
    handleClick(tab, event) {},
    handleClose(done) {
      this.$confirm("Sure close?")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
    handleSelectionChange(val) {
      this.multipleTable = val;
    },
    getChange(pre, next) {
      this.desOfCarousel = this.multipleTable[pre].description;
      console.log(this.desOfCarousel);
    },
    downloadClick(mt) {
      for (var i = 0; i < mt.length; i++) {
        var link = document.createElement("a");
        link.download = mt[i].name;
        link.href = require("../assets/disaster-product-img/product" +
          (i + 1) +
          ".jpg");
        link.click();
        link.remove();
      }
    },
  },
};
</script>

<style scoped>
.image {
  width: 100%;
  display: block;
}
.el-col {
  border-radius: 4px;
  /* text-align: center; */
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  padding: 5px;
  text-align: left;
  min-height: 20px;
}
</style>
