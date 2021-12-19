<template>
  <el-table :data="productTable" style="width: 100%">
    <el-table-column fixed prop="product" label="Product" width="150" />
    <el-table-column prop="shop" label="Shop" width="150" />
    <el-table-column prop="remaining" label="Remaining" width="150"/>
    <el-table-column prop="price" label="Price" width="150"/>
    <el-table-column>
      <template #default>
        <el-button size="small" @click="handleClick">Add</el-button>
      </template>
    </el-table-column>
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
          shop: 'Shawn',
          remaining: '642',
          price: '1999'
        },
      ],
    }
  },
  methods: {
    handleClick() {
      console.log('click')
    },
  },
}
</script>
<style lang="">
  
</style>