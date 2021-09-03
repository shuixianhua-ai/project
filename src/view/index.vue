<template>
  <div style="height: 100%">
    <el-header>
      <my-header></my-header>
    </el-header>
    <el-main>
      <router-view></router-view>
    </el-main>
    <!-- <el-footer>
      <my-footer></my-footer>
    </el-footer> -->
  </div>

</template>

<script>
import MyHeader from '../common/header'
import MyFooter from '../common/footer'
export default {
  name: 'viewIndex',
  components: {MyHeader,MyFooter},
}

</script>
