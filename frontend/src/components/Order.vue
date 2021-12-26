<template>
<div>

  <el-table :data="currentPage" style="width: 100%">
    <el-table-column fixed prop="product" label="Product" width="150" />
    <el-table-column prop="supplier" label="Supplier" width="150" />
    <!--
    <el-table-column>
      <template #default="scope">
        <el-input>
          size="mini"
          v-model="number"
          @change="pressOrder(scope.$index, scope.row)">Order</el-input>
      </template>
    </el-table-column> 
    -->
   <el-table-column label="Number">
      <template #default="scope">
        <el-input-number
          v-model="scope.row.number"
          size="mini"
          @change="changeNumber(scope.$index, scope.row)"></el-input-number>
      </template>
    </el-table-column> 
    <!-- -->
    <el-table-column>
      <template #default="scope">
        <el-button
          size="mini"
          @click="pressOrder(scope.$index, scope.row)">Order</el-button>
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
      //number: 5,//should be dynamic and different from others
      page: 1,
      pageSize: 5,
      productTable: [
        {
          product: 'apple',
          supplier: 'qwer',
          number: 5
        },
        {
          product: 'orange',
          supplier: 'asdf',
          number: 10
        },
        {
          product: 'banna',
          supplier: 'zxcv',
          number: 3
        },
        {
          product: 'dick',
          supplier: 'Shawn',
          number: 4
        },
        {
          product: 'orange',
          supplier: 'asdf',
          number: 11
        },
        {
          product: 'banna',
          supplier: 'zxcv',
          number: 89
        },
        {
          product: 'dick',
          supplier: 'Shawn',
          number: 1094
        },
      ],
    }
  },
  methods: {
    changeNumber(index,row){
        console.log(index)
        console.log(row)
    },
    ///////////
    pressOrder(index,row) {
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