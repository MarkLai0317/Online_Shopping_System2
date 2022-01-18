<template>
<div>
  <h2>ForSale</h2>
  <el-table 
  :data="currentPage" 
  style="width: 100%"
  >
    <el-table-column prop="ProductName" label="Product" width="150" />
    <el-table-column prop="SupplierID" label="Supplier" width="150" />
    <el-table-column prop="Num" label="Number" width="150"/>
    <el-table-column prop="Price" label="Price" width="150"/>

  </el-table>
  <el-pagination
    background
    layout="prev, pager, next"
    :page-size="pageSize"
    :total="this.forSaleTable.length"
    @current-change="setPage">
  </el-pagination>

  


  <!-- Have table -->


  <h2>Products</h2>
  <el-table 
  :data="productTable" 
  style="width: 100%"
  >
    <el-table-column prop="ProductName" label="Product" width="150" />
    <el-table-column prop="SupplierID" label="Supplier" width="150" />
    <el-table-column prop="Num" label="Remaining" width="150" /> 

    <el-table-column label="Number">
      <template #default="scope">
        <el-input-number
          v-model="scope.row.number"
          size="mini"
          :max="scope.row.remain"
          :min="1"
          @change="changeNumber(scope.$index, scope.row)"></el-input-number>
      </template>
    </el-table-column> 
    <!-- -->
    <el-table-column label="Price">
      <template #default="scope">
        <el-input-number
          v-model="scope.row.price"
          size="mini"
          :min="1"
          @change="changePrice(scope.$index, scope.row)"></el-input-number>
          
      </template>
    </el-table-column> 
    
    <!-- -->
    <el-table-column>
      <template #default="scope">
        <el-button
          size="mini"
          @click="handleAdd(scope.$index, scope.row)">Add</el-button>
      </template>
    </el-table-column> 
    
  </el-table>

</div>
</template>

<script >
export default {
  data() {
    return {
      page: 1,
      pageSize: 5,
      forSaleTable: [],
      productTable: [],
    }
  },
  methods: {
    getForSaleTable(){
      console.log("get forSale")
      this.axios.get('http://127.0.0.1:9000/ni/GetForsale', {
        params: {
          ManagerID: this.firebase.auth().currentUser.email
        }
      })
      .then(response=> {
        let res = JSON.stringify(response.data); 
        let resobj = JSON.parse(res)
        this.forSaleTable = resobj.data
        console.log(this.forSaleTable)
        
      })
      .catch(error => {
        console.log(error);
      })
      .then(function () {
        // always executed
      })
    },
    getHaveTable(){
      console.log("get Have")
      this.axios.get('http://127.0.0.1:9000/ni/GetHave', {
        params: {
          ManagerID: this.firebase.auth().currentUser.email
        }
      })
      .then(response=> {
        let res = JSON.stringify(response.data); 
        let resobj = JSON.parse(res)
        this.productTable = resobj.data
        // console.log("data:")
        // console.log(resobj.data)
        for(var i=0;i<this.productTable.length;++i){
          this.productTable[i].number = 1
          this.productTable[i].price = 150
        }
        console.log(this.productTable)
        
      })
      .catch(error => {
        console.log(error);
      })
      .then(function () {
        // always executed
        
      })
    },
    changeNumber(index,row){
        console.log(index)
        console.log(row)
    },
    ///////////
    changePrice(index,row) {
      console.log(index)
      console.log(row)
      
      this.axios.post('http://127.0.0.1:9000/ni/PriceChange', {
        // post 參數放這裡
        ManagerID: this.firebase.auth().currentUser.email,
        Price: row.price,
        SupplierID: row.SupplierID,
        ProductID: row.ProductID
      })
      .then(response => {// 回傳的 response 處理
        console.log(response);
        let res = JSON.stringify(response.data); // 先 變字串
        let resobj = JSON.parse(res) 
        if(resobj.error){
          this.error = resobj.error
        }
        else{
          console.log('change price succeed!')
          this.getForSaleTable()
        }

      })
      
      this.getForSaleTable()
    },
    ////////
    
    handleAdd(index, row) {
      console.log(index, row);
      
      this.axios.post('http://127.0.0.1:9000/nn/forSell', {
        // post 參數放這裡
        StoreHouseID: row.StoreHouseID,
        ShopManagerID: this.firebase.auth().currentUser.email,
        // ShopID: row.ShopID,
        ProductSupplierID: row.SupplierID,
        ProductID: row.ProductID,
        Num: row.number,
        price: row.price
      })
      .then(response => {// 回傳的 response 處理
        console.log(response);
        let res = JSON.stringify(response.data); // 先 變字串
        let resobj = JSON.parse(res) 
        if(resobj.error){
          this.error = resobj.error
        }
        else{
          console.log('add to ForSale succeed!')
          this.getForSaleTable()
          this.getHaveTable()
        }
      })
      
      
    },
    setPage(val){
      console.log(val)
      this.page = val
    }
  },

  created(){
    this.getForSaleTable()
    this.getHaveTable()
  },

  computed: {
    currentPage(){
      return this.forSaleTable.slice(this.pageSize*this.page-this.pageSize,this.pageSize*this.page)
    }
  }
}
</script>
<style lang="">
  
</style>