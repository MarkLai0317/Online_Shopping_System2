<template>
  <div>
    <div class="error" v-if="error">{{error.message}}</div>
    <form @submit.prevent="pressed">
      Register
      <div class="email">
        <input type="email" v-model="email" placeholder="email" />
      </div>
      <div class="password">
        <input type="password" v-model="password" placeholder="password" />
      </div>
      <div class="password">
        <input type="password" v-model="passwordConfirm" placeholder="password confirm" />
      </div>
      <div class="phoneNumber">
        <input type="phoneNumber" placeholder="phoneNumber" v-model="phoneNumber"/>
      </div>
      <button type="submit"  :disabled="registerDisable">Register</button>
    </form>
  </div>
</template>

<script>
import firebase from "firebase/compat/app";
import "firebase/auth";
export default {
  data() {
    return {
      email: "",
      password: "",
      passwordConfirm: "",
      phoneNumber: "",
      error: ""
    };
  },
  computed:{
    registerDisable(){
      return !(this.password == this.passwordConfirm) || this.password == '' || this.email == ''
              || this.phoneNumber == '' || this.phoneNumber.length != 10 || !(/^\d+$/.test(this.phoneNumber)) 
    }
  },
  methods: {
    pressed() {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(() => {
          console.log("here");
          this.$router.replace({ name: "Buy" });
        })
        .catch(error => (this.error = error));
      
    }
  },

};
</script>

<style  scoped>
.error {
  color: red;
  font-size: 18px;
}
input {
  width: 400px;
  padding: 30px;
  margin: 20px;
  font-size: 21px;
}
button {
  width: 400px;
  height: 75px;
  font-size: 100%;
}
</style>