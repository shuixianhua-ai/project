<template>
  <div>
    <router-link to="/DisasterDisplay" :class="{aSticky:header_fixed}">Disaster Display</router-link>
  </div>
</template>

<style>

</style>
<script>
export default {
    name: 'Hello',
    data () {
      return {
        id: ''
      }
    },
    created(){
       this.getParams()
    },
    methods: {
    updates(id){
              this.$router.push({
                path:'/DisasterDisplay',
                name:'DisasterDisplay',
                params:{
                 id : id
                }
              })
            }
      
    },
   
  }
</script>