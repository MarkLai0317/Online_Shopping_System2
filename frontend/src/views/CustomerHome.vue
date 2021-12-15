<template>
  <div class="about">
    <div id="nav">
      <CustomerHeader/>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import CustomerHeader from '../components/CustomerHeader.vue'
export default {
  components:{
    CustomerHeader
  }
}
</script>
<style lang="">
  
</style>
