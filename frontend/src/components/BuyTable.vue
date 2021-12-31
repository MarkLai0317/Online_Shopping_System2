<template>
<div>

  <el-table :data="currentPage" style="width: 100%">
    <el-table-column fixed prop="ProductName" label="Product" width="150" />
    <el-table-column prop="ShopName" label="Shop" width="150" />
    <el-table-column prop="RemainNumber" label="Remain" width="150"/>
    <el-table-column prop="Price" label="Price" width="150"/>
    <el-table-column prop="Type" label="Type" width="150"/>
    <!-- -->
    <el-table-column>
      <template #default="scope">
        <el-button
          size="mini"
          @click="pressAdd(scope.$index, scope.row)">Add</el-button>
      </template>
    </el-table-column>
    <!-- -->

  </el-table>
  <el-pagination
    background
    layout="prev, pager, next"
    :page-size="pageSize"
    :total="totalPage"
    @current-change="getPage">
  </el-pagination>
  <!-- test button -->
     
</div>
</template>

<script >
export default {
  data() {
    return {
      totalPage: 50,
      pageSize: 10,
      currentType: '',
      currentShopName: '', 
      currentPage: [],
    }
  },
  created(){
    this.getPage(1)
  },
  methods: {

    getPage(val) {

      //get 寫法
      this.axios.get('http://127.0.0.1:9000/nn/searchProduct', {
        params: {
          //get 參數放這裡
          ShopID: this.currentShopName,
          Type: this.currentType,
          page: val
        }
      })
      .then(response=> {//  get 回來的 資料 處理
        let res = JSON.stringify(response.data); // 先 變字串
        let resobj = JSON.parse(res) // 再變 object
        this.currentPage = resobj.data
        // 就可以做其他處理 像存到data 裡面
        console.log(resobj.data)
        console.log(this.productTable)
        console.log(val)
      })
      .catch(error => {
        console.log(error);
      })
      .then(function () {
        // always executed
      })
    },
    ///////////
    pressAdd(index,row) {
      console.log(index)
      console.log(row)
    },
    ////////
    
  },
  computed: {
    /*
    currentPage: function(){
      let temp = {
        Price: this.productTable.Price,
        Product: this.productTable.ProductName,
        Shop: this.productTable.ShopID,
        RemainNumber: this.productTable.RemainNumber,
        Type: this.productTable.Type
      };
      return temp
    }
    */
    
  }
}
</script>
<style lang="">
  
</style>