<template>
  <div>
    <el-container>
      <p>Order history</p>
      <p />
      <el-header>
        <p />
        <el-row :gutter="30" justify="start">
          <el-col :span="2">
            <div class="grid-content">{{ orderdata.Date }}</div>
          </el-col>
          <el-col :span="4" :offset="0">
            <div class="grid-content">ID:{{ orderdata.Oid }}</div>
          </el-col>
          <el-col :span="3" :offset="0">
            <div class="grid-content">${{ orderdata.Price }}</div>
          </el-col>
        </el-row>
      </el-header>
      <el-main>
        <el-table :data="tableData">
          <el-table-column prop="Name" label="Name" width="220" />
          <el-table-column prop="Shop" label="Shop" width="150" />
          <el-table-column prop="Number" label="Number" width="80" />
          <el-table-column prop="Price" label="Price" width="100" />
        </el-table>
      </el-main>
      <p />
    </el-container>
    <el-button  @click="lastPage">Last Page</el-button>
    <box class="pageBox">{{ this.page }}</box>
    <el-button  @click="nextPage">Next Page</el-button>
  </div>
</template>

<script lang="" scoped>
export default {
  data() {
    return {
      page: 1,

      orderdata: {
        Date: "2021-12-12",
        Oid: "12345678",
        Price: 6229,
      },

      tableData: [
        {
          Name: "Food",
          Shop: "7-11",
          Number: 2,
          Price: 12,
        },
        {
          Name: "Food",
          Shop: "7-11",
          Number: 2,
          Price: 12,
        },
        {
          Name: "Food",
          Shop: "7-11",
          Number: 2,
          Price: 12,
        },
        {
          Name: "Food",
          Shop: "7-11",
          Number: 2,
          Price: 12,
        },
      ],
      orderdata1: {
        Date: "2022-01-01",
        Oid: "1678asdt",
        Price: 6239,
      },
    };
  },
  methods: {
    lastPage() {
       if (this.page - 1 > 0) {
        this.page -= 1;
       }
      //last page
      console.log("last page");
    },
    nextPage() {
      this.page += 1;
      //next page
      console.log("next page");
    },
  },
};
</script>

<style>
.pageBox {
  padding: 10px;
}
</style>
