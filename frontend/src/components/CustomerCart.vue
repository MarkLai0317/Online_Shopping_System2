<template>
<div>

  <el-table :data="productTable" style="width: 100%">
   <el-table-column width="50">
      <template #default="scope">
        <el-checkbox
          v-model="scope.row.isSelected"
          size="mini"
          @change="changeSelect(scope.$index, scope.row)"></el-checkbox>
      </template>
    </el-table-column>  
    
    <el-table-column prop="product" label="Product" width="150" />
    <el-table-column prop="shop" label="Shop" width="150" />
    <el-table-column prop="price" label="Price" width="150" /> 
    <el-table-column label="Number">
      <template #default="scope">
        <el-input-number
          v-model="scope.row.number"
          size="mini"
          @change="changeNumber(scope.$index, scope.row)"></el-input-number>
      </template>
    </el-table-column> 
  </el-table>
    <el-button @click="buyEverything">Buy</el-button>
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
          isSelected: true,
          product: 'apple',
          shop: 'qwer',
          price: 50,
          number: 5
        },
        {
          isSelected: true,
          product: 'orange',
          shop: 'asdf',
          price: 39,
          number: 10
        },
        {
          isSelected: true,
          product: 'banna',
          shop: 'zxcv',
          price: 15,
          number: 3
        },
        {
          isSelected: true,
          product: 'dick',
          shop: 'Shawn',
          price: 999,
          number: 4
        },
        {
          isSelected: true,
          product: 'orange',
          shop: 'asdf',
          price: 60,
          number: 11
        },
        {
          isSelected: true,
          product: 'banna',
          shop: 'zxcv',
          price: 20,
          number: 89
        },
        {
          isSelected: true,
          product: 'dick',
          shop: 'Shawn',
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
    buyEverything(){
      console.log("buy")
    }


  },
  computed: {
  
  }
}
</script>
<style lang="">
  
</style>