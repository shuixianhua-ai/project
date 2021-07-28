<template>
  <div id="product">
    <el-table
      :data="tableData"
      ref="multipleTable"
      @selection-change="handleSelectionChange"
      style="width: 100%"
    >
      <el-table-column type="selection" align="center" width="55">
      </el-table-column>
      <!-- <el-table-column
        prop="date"
        label="date"
        width="120">
      </el-table-column> -->
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
                        require('../assets/raster/img' + (index + 1) + '.jpg')
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
            <el-table-column prop="responder" label="responder">
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
export default {
  name: "productofPage",
  data() {
    return {
      activeName1: "Overview",
      dialogVisible: false,
      multipleTable: [],
      desOfCarousel: [],
      tableData: [
        {
          id: "1",
          did: "1",
          date: "2016-05-02",
          name: "Product1",
          disaster: "Forest Fire",
          sponsor: "AAA",
          responder: "BBB",
          description:
            "Product1 test—— Destroyed structures observed nearby the blast epicenter as of July 2021; Widespread damage and damaged roofs observed within a 1 km radius zone from the blast epicenter as of 7 July 2021; No damaged roofs were observed beyond a 2 km radius from the blast epicenter as of 7 & 9 July 2021.",
        },
        {
          id: "2",
          did: "1",
          date: "2016-07-04",
          name: "Product2",
          disaster: "Flood",
          sponsor: "AAA",
          responder: "BBB",
          description: "Product2 ……",
        },
        {
          id: "3",
          did: "2",
          date: "2016-08-01",
          name: "Product3",
          disaster: "Typhoon",
          sponsor: "AAA",
          responder: "BBB",
          description: "Product3 ……",
        },
        {
          id: "4",
          did: "2",
          date: "2016-12-03",
          name: "Product4",
          disaster: "Snow storm",
          sponsor: "AAA",
          responder: "BBB",
          description: "Product4 ……",
        },
      ],
    };
  },
  created() {
    console.log(this.desOfCarousel.length);
  },
  watch: {
    multipleTable(o, n) {
      // console.log(o[0].description);
      if (o.length > 0) this.desOfCarousel = o[0].description;
      else this.desOfCarousel = [];
    },
    deep: true,
    immediate: true,
  },
  methods: {
    handleClick(tab, event) {
      // console.log(tab, event);
    },
    handleClose(done) {
      this.$confirm("Sure close?")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
    handleSelectionChange(val) {
      this.multipleTable = val;
      // console.log(this.multipleTable);
    },
    getChange(pre, next) {
      this.desOfCarousel = this.multipleTable[pre].description;
      // console.log(pre+ "  " +next);
      console.log(this.desOfCarousel);
    },
    downloadClick(mt) {
      for (var i = 0; i < mt.length; i++) {
        var link = document.createElement("a");
        link.download = mt[i].name;
        link.href = require("../assets/raster/img" + (i + 1) + ".jpg");
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
