<template lang="">
  <el-container>
    <el-button @click="signOut">logout</el-button>   
    <el-button @click="cartVisible=true">Cart</el-button>
    <el-button @click="historyVisible=true">History</el-button> 
    <!--
    <Cart
    v-if="cartVisible"
    @done="cartVisivle=false"
    />
    -->
  </el-container>
</template>
<script>
//import firebase from "firebase/compat/app";
//import "firebase/auth";
//import Cart from '../components/Cart.vue'

export default {
  components:{
    //Cart
  },
  data(){
    return{
      historyVisible: false,
      cartVisible: false
    }
  },
  methods: {
    signOut() {
      this.firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.replace({ name: "Login" });
          console.log(this.firebase.auth().currentUser)
        });
    }
  }
}
</script>
<style lang="">
  
</style>