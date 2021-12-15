<template>
  <el-container style="height: 500px; border: 1px solid #eee">
    
    <el-container>
      <el-header style=" font-size: 30px">
        <CustomerHeader></CustomerHeader>
      </el-header>

      <el-main>
        <router-view/>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  import CustomerHeader from '../components/CustomerHeader'
export default {
  
  components:{
    CustomerHeader,
   
  }
}
</script>
<style lang="">
  
</style>
