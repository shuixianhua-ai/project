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
    <div style="margin: 15px 0"></div>
    <el-button round @click="dialogVisible = true">Display</el-button>
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
          <el-card :body-style="{ padding: '5px' }" align="middle">
            <img src="../assets/raster/img1.jpg" class="image" />
          </el-card>
          <div style="padding: 10px" />
          <el-card :body-style="{ padding: '15px' }" align="left">
            <span>
              <div class="text">
                Destroyed structures observed nearby the blast epicenter as of 7
                July 2021; Widespread damage and damaged roofs observed within a
                1 km radius zone from the blast epicenter as of 7 July 2021; No
                damaged roofs were observed beyond a 2 km radius from the blast
                epicenter as of 7 & 9 July 2021.
              </div>
            </span>
          </el-card>
        </el-tab-pane>
        <el-tab-pane label="Sources">
          <!-- <el-card :body-style="{ padding: '5px' }">
            <el-col :span="24">
              <div class="grid-content bg-purple">07 Jul 2021, 04:11:07</div>
            </el-col>
            <el-col :span="24">
              <div class="grid-content bg-purple-light">
                Agency: CNES Satellite: PLEIADES_1B Instrument: PHR1B Mode: PX
              </div>
            </el-col>
            <el-col :span="24">
              <div class="grid-content bg-purple-light">
                Includes Pleiades material © CNES (2021), Distribution Airbus
                DS.
              </div>
            </el-col>
          </el-card> -->
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
      tableData: [
        {
          id: "1",
          date: "2016-05-02",
          name: "Product1",
          disaster: "Forest Fire",
          sponsor: "AAA",
          responder: "BBB",
        },
        {
          id: "2",
          date: "2016-07-04",
          name: "Product2",
          disaster: "Flood",
          sponsor: "AAA",
          responder: "BBB",
        },
        {
          id: "3",
          date: "2016-08-01",
          name: "Product3",
          disaster: "Typhoon",
          sponsor: "AAA",
          responder: "BBB",
        },
        {
          id: "4",
          date: "2016-12-03",
          name: "Product4",
          disaster: "Snow storm",
          sponsor: "AAA",
          responder: "BBB",
        },
      ],
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
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
      console.log(this.multipleTable);
    },
    // itsmTableCountSelect() {
    //   this.dialogVisible = true;

    // },
  },
};
</script>

<style scoped>
.image {
  width: 50%;
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
