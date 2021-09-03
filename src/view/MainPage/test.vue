<template>
  <div>
    <h style="color:red">id hhhhhhhhhhhhh<h>
    <el-button>我叼你妈的、<el-button>
  </div>
</template>

<style>

</style>
<script>
export default {
    name: 'test',
    data () {
      return {
        id: ''
      }
    },
    created(){
       this.getParams()
    },
    methods: {
      
      getParams () {
        // 取到路由带过来的参数 
        var routerParams = this.$route.params.id
        // 将数据放在当前组件的数据内
        this.id = routerParams
        console.log(id,222222222)
      }
    },
    watch: {
    // 监测路由变化,只要变化了就调用获取路由参数方法将数据存储本组件即可
      '$route': 'getParams'
    }
  }
</script>