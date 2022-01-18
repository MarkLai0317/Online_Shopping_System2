<template>
<div>
  <h2>ForSale</h2>
  <el-table 
  :data="productTable" 
  style="width: 100%"
  >
    <el-table-column prop="product" label="Product" width="150" />
    <el-table-column prop="supplier" label="Supplier" width="150" />
    <el-table-column prop="number" label="Number" width="150"/>
    <el-table-column prop="price" label="Price" width="150"/>

  </el-table>

  


  <!-- Have table -->


  <h2>Products</h2>
  <el-table 
  :data="productTable" 
  style="width: 100%"
  >
    <el-table-column prop="product" label="Product" width="150" />
    <el-table-column prop="supplier" label="Supplier" width="150" />
    <el-table-column prop="remain" label="Remaining" width="150" /> 

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
      productTable: [
        {
          isForSale: true,
          product: 'apple',
          supplier: 'qwer',
          price: 50,
          number: 5,
          remain: 34
        },
        {
          isForSale: true,
          product: 'orange',
          supplier: 'asdf',
          price: 39,
          number: 10,
          remain: 50
        },
        {
          isForSale: true,
          product: 'banna',
          supplier: 'zxcv',
          price: 15,
          number: 3,
          remain: 100
        },
        {
          isForSale: true,
          product: 'dick',
          supplier: 'Shawn',
          price: 999,
          number: 4,
          remain: 100
        },
        {
          isForSale: true,
          product: 'orange',
          supplier: 'asdf',
          price: 60,
          number: 11,
          remain: 100
        },
        {
          isForSale: true,
          product: 'banna',
          supplier: 'zxcv',
          price: 20,
          number: 89,
          remain: 100
          
        },
        {
          isForSale: true,
          product: 'dick',
          supplier: 'Shawn',
          price: 8888,
          number: 99,
          remain: 100
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
    
    handleAdd(index, row) {
      console.log(index, row);
    }
  },
  computed: {
    
  }
}
</script>
<style lang="">
  
</style>