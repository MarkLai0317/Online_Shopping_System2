<template lang="">
  <div>
    <el-table class="orderTable" :data="tableData" style="width: 100%">
      <el-table-column prop="product" label="Product" width="180" />
      <el-table-column prop="supplier" label="Supplier" width="180" />
      <el-table-column prop="stock" label="Stock" width="100" />
      <el-table-column width="60">
        <template #default="scope">
          <el-button size="mini" @click="minusOrder(scope.$index, scope.row)">-</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="orderNum" label="Number" width="73" />
      <el-table-column width="60">
        <template #default="scope">
          <el-button size="mini" @click="addOrder(scope.$index, scope.row)">+</el-button>
        </template>
      </el-table-column>
      <el-table-column label="Order" width="90">
        <template #default="scope">
          <el-button size="mini" @click="clickOrder(scope.$index, scope.row)">Order</el-button>
        </template>
      </el-table-column>
    </el-table>
    <p/>
    <el-button  @click="clickLastPage">Last Page</el-button>
    <box class="pageBox">{{ this.page }}</box>
    <el-button  @click="clickNextPage">Next Page</el-button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      page: 1,
      tableData: [
        {
          product: "apple",
          supplier: "me",
          stock: 2,
          orderNum: 0,
          pid: 123,
        },
        {
          product: "apple",
          supplier: "me",
          stock: 2,
          orderNum: 0,
          pid: 123,
        },
        {
          product: "apple",
          supplier: "me",
          stock: 2,
          orderNum: 0,
          pid: 123,
        },
        {
          product: "apple",
          supplier: "me",
          stock: 2,
          orderNum: 0,
          pid: 123,
        },
      ],
    };
  },
  methods: {
    clickLastPage() {
      if (this.page - 1 > 0) {
        this.page -= 1;
        // last page
        console.log(this.page);
      }
    },
    clickNextPage() {
      this.page += 1;
      // last page
      console.log(this.page);
    },
    minusOrder(index,row) {
      if( row.orderNum>0){
      row.orderNum--;
      console.log(index,row);
      }
    },
    addOrder(index,row) {
      row.orderNum++;
    },
    clickOrder(index,row) {
      console.log(row.pid);
      // order pid//
      let stock = row.stock
      row.stock= stock + row.orderNum;
      row.orderNum = 0;
      console.log(row.stock);
    },
  },
};
</script>
<style>
.pageBox {
  padding: 10px;
}
.ordertable{
  align: center;
}
</style>
