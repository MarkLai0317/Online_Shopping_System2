<template>
  <div>
    <el-container>
      <box>Order history</box>
      <p />
      <el-header>
        <p />
        <el-row :gutter="30" justify="start">
          <el-col :span="7">
            <div class="grid-content">{{ orderdata.Date }}</div>
          </el-col>
          <el-col :span="4" :offset="5">
            <div class="grid-content">ID:{{ orderdata.Oid }}</div>
          </el-col>
          <el-col :span="3" :offset="2">
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
      <el-header>
        <p />
        <el-row :gutter="30" justify="start">
          <el-col :span="7">
            <div class="grid-content">{{ orderdata1.Date }}</div>
          </el-col>
          <el-col :span="4" :offset="5">
            <div class="grid-content">ID:{{ orderdata1.Oid }}</div>
          </el-col>
          <el-col :span="3" :offset="2">
            <div class="grid-content">${{ orderdata1.Price }}</div>
          </el-col>
        </el-row>
      </el-header>
      <el-main>
        <el-table :data="tableData1">
          <el-table-column prop="Name" label="Name" width="220" />
          <el-table-column prop="Shop" label="Shop" width="150" />
          <el-table-column prop="Number" label="Number" width="80" />
          <el-table-column prop="Price" label="Price" width="100" />
        </el-table>
      </el-main>
    </el-container>
     <el-button-group>
        <el-button type="primary" @click="lastPage">Last Page</el-button>
        <el-button type="primary" @click="nextPage">Next Page</el-button>
      </el-button-group>
  </div>
</template>

<script lang="" scoped>
export default {
  data() {
    return {
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
      tableData1: [
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
    };
  },
  methods: {
    lastPage(){
      //last page
      console.log("last page");
    },
     nextPage(){
      //next page
      console.log("next page");
    },
  }
};
</script>

<style>
box {
  font-size: 24px;
  color: white;
  padding: 10px;
  background-color: rgb(248, 106, 70);
}
.el-table {
  --el-table-tr-bg-color: #f0f0f0;
  width: 550px;
  font-size: 14px;
  margin-left: auto;
  margin-right: auto;
}
.el-container {
  width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.el-header {
  background-color: #3a89f1;
  color: var(--el-text-color-primary);
  text-align: left;
  height: 50px;
}
.el-main {
  background-color: #9bcdff;
  color: var(--el-text-color-primary);
  text-align: center;
}
.grid-content {
  color: white;
  font-size: 18px;
  text-align: left;
}
.el-button {
  margin-left: auto;
  margin-right: auto;
  align: center;
}
</style>
