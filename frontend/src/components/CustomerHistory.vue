<template>
  <div>
    <el-container>
      <p>Order history</p>
      <p />
      <el-header>
        <p/>
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
      <p/>
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
      CustomerID: this.firebase.auth().currentUser.email,
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
      //get 寫法
      this.axios.get('http://127.0.0.1:9000/nn/history', {
        params: {
          //get 參數放這裡
          CustomerID: this.CustomerID,
          page: this.page,
        }
      })
      .then(response=> {//  get 回來的 資料 處理
        let res = JSON.stringify(response.data); // 先變字串
        let resobj = JSON.parse(res) // 再變 object
        this.table = resobj
        // 就可以做其他處理 像存到data 裡面
        console.log(resobj.ProductID)
      })
      .catch(error => {
        console.log(error);
      })
      .then(function () {
        // always executed
      })
      //---------
      console.log("last page");
    },
    nextPage() {
     if (this.page + 1 > 0) { // where can get the limit of page
        this.page += 1;
       }
      //next page
      //get 寫法
      this.axios.get('http://127.0.0.1:9000/nn/history', {
        params: {
          //get 參數放這裡
          CustomerID: this.CustomerID,
          page: this.page,
        }
      })
      .then(response=> {//  get 回來的 資料 處理
        let res = JSON.stringify(response.data); // 先變字串
        let resobj = JSON.parse(res) // 再變 object
        this.table = resobj
        // 就可以做其他處理 像存到data 裡面
        console.log(resobj.ProductID)
      })
      .catch(error => {
        console.log(error);
      })
      .then(function () {
        // always executed
      })
      //---------
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
