<template>
  <div>
    <el-button @click="toCustomerHome">Customer</el-button>
    <el-button @click="toManagerHome">Manager</el-button>
  </div>
</template>

<script>

export default {
  components: {

  },
  method: {
    toCustomerHome(){
      console.log("123")
      //this.$router.push({name:"CustomerHome"})
    },
    toManagerHome(){
      this.router.push({name:"ManagerHome"})
    }
  }
  
}
</script>
