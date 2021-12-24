<template>
    <div>
      <MarkComponent :prop="testProp"></MarkComponent>
      <el-button @click="registerCustomer()">register</el-button>
    </div>
</template>

<script>

import MarkComponent from './test/MarkComponent.vue'

export default {
  components:{
    MarkComponent
  },
  created(){
    this.getSensorData()
    
  },
  data(){
    return{
      options:[
        {
          value: 'Option1',
          label: 'Option1',
        },
        {
          value: 'Option2',
          label: 'Option2',
        },
        {
          value: 'Option3',
          label: 'Option3',
        },
        {
          value: 'Option4',
          label: 'Option4',
        },
        {
          value: 'Option5',
          label: 'Option5',
        },
      ],
      valueA: '',
      table: [{
          id:'1',
          name: 'n',
        },
        {
          id: '2',
          name: 'n2'
        }
      ],
      testProp: 'testProp string'
    }
  },
  methods:{
    handle() {
      console.log(console.log(this.firebase.auth().currentUser.email))
      
    },
    getSensorData() {

      //get 寫法
      this.axios.get('http://127.0.0.1:9000/mark/searchProduct', {
        params: {
          //get 參數放這裡
          shopID: 90,
          type: 'fruit',
          page: 1
        }
      })
      .then(function (response) {//  get 回來的 資料 處理
        let res = JSON.stringify(response.data); // 先 變字串
        let resobj = JSON.parse(res) // 再變 object
        // 就可以做其他處理 像存到data 裡面
        console.log(resobj)
      })
      .catch(function (error) {
        console.log(error);
      })
      .then(function () {
        // always executed
      })
    },
    registerCustomer(){

      //post 寫法
      this.axios.post('http://127.0.0.1:9000/mark/register/customer', {
        // post 參數放這裡
        Email:'test1@gmail.com', 
        Name: 'test1',
        PhoneNum: '0911222333'
      })
      .then(function (response) {// 回傳的 response 處理
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    }
    
  }
}
</script>