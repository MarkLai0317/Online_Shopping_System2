<template>

  <!--<changTest/>-->
  
  <div>
    <div>
    <input type="button" @click="add()"/>
    </div>
    <el-select v-model="value" placeholder="Select" @change="disnumber">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      >
      </el-option>
    </el-select>
  </div>


  <div>
    <apexchart type="line" height="500" width="900" align="center" :options="chartOptions" :series="series"></apexchart>
  </div>
  

</template>
<script>
import { ref, defineComponent } from 'vue'
import VueApexCharts from "vue3-apexcharts";
//import changTest from '../components/test/changTest.vue'

export default defineComponent({  

  setup() {
    return {

      options: ref([
        
        {
          value: 'Week',
          label: 'Week',
        },
        {
          value: 'Month',
          label: 'Month',
        },
        {
          value: 'Halfyear',
          label: 'Halfyear',
        },
        {
          value: 'Year',
          label: 'Year',
        },
      ]),
      value: ref(''),
    }
  },

  components: {
    apexchart: VueApexCharts,
    //changTest,
  },

  computed:{
    
  },


  data() {
    return {
      
      count:1,
      
      series:[{
          data:[]
      }],
      
      chartOptions: {
        chart: {
          height: 350,
          type: 'line',
          zoom: {
            enabled: false
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: 'straight'
        },
        title: {
          text: 'Total Revenue',
          align: 'left'
        },
        grid: {
          row: {
            colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
            opacity: 0.5
          },
        },
        xaxis: {
          type: 'numeric'
        }
      },


    };
  },
   
  methods:{
    add(){
      this.series[0].data.push([this.count,this.count])
      this.count+=1
    },

    disnumber(val){
      
      
      if(val=='Week'){
        console.log(val)

      }
      else if(val=='Month'){
        console.log(val)

      }
      else if(val=='Halfyear'){
        console.log(val)

      }
      else if(val=='Year'){
        console.log(val)

      }
    }

  }
})
</script>
