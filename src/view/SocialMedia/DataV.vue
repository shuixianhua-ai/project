<template>
  <div id="app">
    <datav />
  </div>
</template>

<script>
import datav from "./datav/index.vue";

export default {
  name: "SocialMediaPage",
  components: {
    datav,
  },
  data() {
    return {};
  },
};
</script>

<style lang="less">
#app {
  font-family: Arial, "Avenir", Helvetica, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  width: 100%;
  height: 100%;
  margin-top: 15px;
}
</style>
