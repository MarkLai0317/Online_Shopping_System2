<template>
<div>

  <el-table 
  :data="currentPage" 
  style="width: 100%"
  >
   <el-table-column label="For Sale">
      <template #default="scope">
        <el-checkbox
          v-model="scope.row.isForSale"
          size="mini"
          @change="changeSelect(scope.$index, scope.row)"></el-checkbox>
      </template>
    </el-table-column>  
    
    <el-table-column prop="product" label="Product" width="150" />
    <el-table-column prop="supplier" label="Supplier" width="150" />
    <el-table-column label="Number">
      <template #default="scope">
        <el-input-number
          v-model="scope.row.number"
          size="mini"
          @change="changeNumber(scope.$index, scope.row)"></el-input-number>
      </template>
    </el-table-column> 
    <!-- -->
    <el-table-column label="Price">
      <template #default="scope">
        <el-input-number
          v-model="scope.row.price"
          size="mini"
          @change="changePrice(scope.$index, scope.row)"></el-input-number>
      </template>
    </el-table-column> 
    <!-- -->
   
  </el-table>
  <el-pagination
    background
    layout="prev, pager, next"
    :page-size="pageSize"
    :total="this.productTable.length"
    @current-change="setPage">
  </el-pagination>
</div>
</template>

<script >
export default {
  data() {
    return {
      page: 1,
      pageSize: 5,
      productTable: [
        {
          isForSale: true,
          product: 'apple',
          supplier: 'qwer',
          price: 50,
          number: 5
        },
        {
          isForSale: true,
          product: 'orange',
          supplier: 'asdf',
          price: 39,
          number: 10
        },
        {
          isForSale: true,
          product: 'banna',
          supplier: 'zxcv',
          price: 15,
          number: 3
        },
        {
          isForSale: true,
          product: 'dick',
          supplier: 'Shawn',
          price: 999,
          number: 4
        },
        {
          isForSale: true,
          product: 'orange',
          supplier: 'asdf',
          price: 60,
          number: 11
        },
        {
          isForSale: true,
          product: 'banna',
          supplier: 'zxcv',
          price: 20,
          number: 89
        },
        {
          isForSale: true,
          product: 'dick',
          supplier: 'Shawn',
          price: 8888,
          number: 1094
        },
      ],
    }
  },
  methods: {
    changeSelect(index,row){
      console.log(index)
      console.log(row)
    },
    changeNumber(index,row){
        console.log(index)
        console.log(row)
    },
    ///////////
    changePrice(index,row) {
      console.log(index)
      console.log(row)
    },
    ////////
    setPage(val){
      console.log(val)
      this.page = val
    }
  },
  computed: {
    currentPage(){
      return this.productTable.slice(this.pageSize*this.page-this.pageSize,this.pageSize*this.page)
    }
  }
}
</script>
<style lang="">
  
</style>