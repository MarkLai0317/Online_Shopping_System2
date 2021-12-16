<template lang="">
  <div>
    customerHome header -------------------
    <el-button @click="signOut">logout</el-button>
  </div>
</template>
<script>
//import firebase from "firebase/compat/app";
//import "firebase/auth";

export default {
  components:{
    
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