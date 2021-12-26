<template>
<div>

  <el-table :data="currentPage" style="width: 100%">
    <el-table-column fixed prop="product" label="Product" width="150" />
    <el-table-column prop="shop" label="Shop" width="150" />
    <el-table-column prop="remaining" label="Remaining" width="150"/>
    <el-table-column prop="price" label="Price" width="150"/>
    <el-table-column prop="type" label="Type" width="150"/>
    <!-- -->
    <el-table-column>
      <template #default="scope">
        <el-button
          size="mini"
          @click="add(scope.$index, scope.row)">Add</el-button>
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
          product: 'apple',
          shop: 'qwer',
          remaining: '24',
          type: 'fruit',
          price: '20',
        },
        {
          product: 'orange',
          shop: 'asdf',
          remaining: '44',
          type: 'fruit',
          price: '25',
        },
        {
          product: 'banna',
          shop: 'zxcv',
          remaining: '251',
          type: 'fruit',
          price: '40',
        },
        {
          product: 'dick',
          shop: 'Shawn',
          remaining: '642',
          type: 'fruit',
          price: '1999', 
        },
        {
          product: 'orange',
          shop: 'asdf',
          remaining: '44',
          type: 'fruit',
          price: '25',
        },
        {
          product: 'banna',
          shop: 'zxcv',
          remaining: '251',
          type: 'fruit',
          price: '40',
        },
        {
          product: 'dick',
          shop: 'Shawn',
          remaining: '642',
          type: 'fruit',
          price: '1999'
        },
      ],
    }
  },
  methods: {
    ///////////
    add(index,row) {
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