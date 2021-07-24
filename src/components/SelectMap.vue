<template>
  <div class="selectFrame">
    <div class="map-overlay top" position="top-right">
      <div class="map-overlay-inner">
        <fieldset>
          <label>{{msg}}</label>
          <label>Select Data to Download</label>
          <select id="layer" name="layer">
            <option value="water">Water</option>
            <option value="building">Buildings</option>
          </select>
        </fieldset>
        <fieldset>
          <!-- <label>Choose a color</label
          > -->
          <el-button
            size="mini"
            type="info"
            icon="el-icon-info"
            circle
            plain
          ></el-button>
          <el-button
            size="mini"
            type="info"
            icon="el-icon-download"
            circle
            plain
          ></el-button>
        </fieldset>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "selectFrame",
  data() {
    return {
      msg: "Activation1 -- China",
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.map-overlay {
  font: 12px/20px "Helvetica Neue", Arial, Helvetica, sans-serif;
  position: absolute;
  width: 200px;
  top: 0;
  left: 0;
  padding: 10px;
  z-index: 600;
}

.map-overlay .map-overlay-inner {
  background-color: #fff;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  border-radius: 3px;
  padding: 10px;
  margin-bottom: 10px;
}

.map-overlay-inner fieldset {
  border: none;
  padding: 0;
  margin: 0 0 10px;
}

.map-overlay-inner fieldset:last-child {
  margin: 0;
}

.map-overlay-inner select {
  width: 100%;
}

.map-overlay-inner label {
  display: block;
  font-weight: bold;
  margin: 0 0 5px;
}

.map-overlay-inner button {
  display: inline-block;
  width: 36px;
  height: 36px;
  border: none;
  cursor: pointer;
}

.map-overlay-inner button:focus {
  outline: none;
}

.map-overlay-inner button:hover {
  box-shadow: inset 0 0 0 3px rgba(0, 0, 0, 0.1);
}
</style>
