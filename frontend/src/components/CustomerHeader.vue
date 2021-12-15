<template lang="">
  <div>
    customerHome header -------------------
    <el-button @click="signOut">logout</el-button>
  </div>
</template>
<script>
import firebase from "firebase/compat/app";
import "firebase/auth";

export default {
  components:{
    
  },
  methods: {
    signOut() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.replace({ name: "Login" });
        });
    }
  }
}
</script>
<style lang="">
  
</style>