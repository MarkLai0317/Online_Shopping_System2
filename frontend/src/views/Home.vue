<template>
  <div>
    <el-button @click="toCustomerLogin">Customer</el-button>
    <el-button @click="toManagerLogin">Manager</el-button>
  </div>
</template>

<script>

export default {
  components: {

  },
  methods: {
    toCustomerLogin(){
      console.log("123")
      this.$router.push({name:"Login"}) // should be custumer login
    },
    toManagerLogin(){
      this.$router.push({name:"Login"}) // should be manager login
    },
  }
  
}
</script>
