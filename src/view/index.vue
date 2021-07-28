<template>
  <div style="height: 100%">
    <el-header>
      <my-header></my-header>
    </el-header>
    <el-main>
      <router-view></router-view>
    </el-main>
  </div>

</template>

<script>
import MyHeader from '../common/header'
export default {
  name: 'viewIndex',
  components: {MyHeader}
}

</script>
