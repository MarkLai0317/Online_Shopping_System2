<template>
  <el-table :data="productTable" style="width: 100%">
    <el-table-column prop="product" label="Product" width="150" />
    <el-table-column prop="shop" label="Shop" width="150" />
    <el-table-column prop="remaining" label="Remaining" width="150"/>
    <el-table-column prop="price" label="Price" width="150"/>
  </el-table>
</template>

<script >
export default {
  data() {
    return {
      productTable: [
        {
          product: 'apple',
          shop: 'qwer',
          remaining: '24',
          price: '20',
        },
        {
          product: 'orange',
          shop: 'asdf',
          remaining: '44',
          price: '25',
        },
        {
          product: 'banna',
          shop: 'zxcv',
          remaining: '251',
          price: '40',
        },
        {
          product: 'dick',
          shop: 'Tom',
          remaining: '642',
          price: '1999'
        },
      ],
    }
  },
}
</script>
<style lang="">
  
</style>