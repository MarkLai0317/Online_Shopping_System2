<template>
  <div>
    <!--
    <div>
    <input type="button" @click="add()"/>
    </div>
    -->
    <el-select v-model="value" placeholder="Select Year" @change="selectact">
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

export default defineComponent({  
  created(){
    this.getSensorData()
  },
  setup() {
    return {
      options: ref([
        {
          value:'ALL',
          lable:'ALL',
        },
      ]),
      value: ref(''),
    }
  },
  components: {
    apexchart: VueApexCharts,
  },
  data() {
    return {
      input:new Array,
      series:[{
        name:"series-1",
        data:[0,0,0,0,0,0,0,0,0,0,0,0],
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
          categories:["Jan","Feb","Mar","Apr","May","June","July","Aug","Sept","Oct","Nov","Dec"],
        }
      },
    };
  }, 
  methods:{
    /*
    add(){
      this.input.push(
        {
        year:2015,
        month:1,
        price:100,
        },
        {
          year:2028,
          month:5,
          price:99,
        },
        {
          year:2000,
          month:12,
          price:80,
        } 
      )
      this.input.sort(function compare(a,b){
        return a.year<b.year
      })
      this.trans_to_options()
      console.log(this.input)
      
    },
    */
    selectact(val){
      if(val=='ALL'){
        for(let i in this.input){
          //    初始化
          if(i==0){
            this.series[0].name=this.input[0].year.toString()
            for(let j=0;j<12;++j){
              this.series[0].data[j]=0
            }
          }
          else if(this.input[i].year!=this.input[i-1].year){
            this.series.push({name:this.input[i].year,data:[0,0,0,0,0,0,0,0,0,0,0,0]})
          }
          //    更新資料
          this.series[this.series.length-1].data[this.input[i].month-1]+=this.input[i].price
        }
      }
      else{
        //    初始化
        this.series=this.series.splice(0,1)
        this.series[0].name=this.input[0].year.toString()
        for(let i=0;i<12;++i){
          this.series[0].data[i]=0;
        }
        //    更新資料
        for(let i in this.input){
          if(this.input[i].year==val){
            this.series[0].data[this.input[i].month-1]+=this.input[i].price
          }
        }
      }
    },

    getSensorData() {

      //get 寫法
      this.axios.get('http://127.0.0.1:9000/ni/Revenue', {
        params: {
          //get 參數放這裡
          ManagerID:'108703060@nccu.edu.tw',
        }
      })
      .then(response=> {//  get 回來的 資料 處理
        let res = JSON.stringify(response.data); // 先 變字串
        let resobj = JSON.parse(res) // 再變 object
        this.table = resobj
        // 就可以做其他處理 像存到data 裡面


        //    trans data from DB to input
        for(let i in resobj.data){
          let temp=resobj.data[i].Time.split("-")
          this.input.push({year:Number(temp[0]),month:Number(temp[1]),price:resobj.data[i].Price})
        }
        this.input.sort(function compare(a,b){
          return a.year<b.year
        })
        this.trans_to_options()

        //    end
      })
      .catch(error => {
        console.log(error);
      })
      .then(function () {
        // always executed
      })
    },

    trans_to_options(){
      //    from input to options
      this.options=this.options.splice(0,1)
      for(let i in this.input){
        if(i==0){
          this.options.push({value:this.input[i].year,lable:this.input[i].year})
        }
        else if(this.input[i].year!==this.input[i-1].year){
          this.options.push({value:this.input[i].year,lable:this.input[i].year})
        }
      }
    },
    
  }
})
</script>
