<template>
    <div>
      <MarkComponent :prop="testProp"></MarkComponent>
    </div>
</template>

<script>

import MarkComponent from './test/MarkComponent.vue'

export default {
  components:{
    MarkComponent
  },
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
      ],
      testProp: 'testProp string'
    }
  },
  methods:{
    handle() {
      console.log(console.log(this.firebase.auth().currentUser.email))
      
    },
    
  }
}
</script>