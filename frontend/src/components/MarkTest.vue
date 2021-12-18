<template>
    <div>
      jfsal;f
      <el-select v-model="valueA" placeholder="Select">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      
      <el-button @click="handle(valueA)">button</el-button>
    </div>
</template>

<script>


export default {
  created(){
    console.log(this.options[0])
    
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
      ]
    }
  },
  methods:{
    handle() {
      console.log(console.log(this.firebase.auth().currentUser.email))
      
    },
    
  }
}
</script>