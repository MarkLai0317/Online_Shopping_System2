<template>
  <div>
    <el-table :data="currentPage" style="width: 100%">
      <el-table-column fixed prop="Name" label="Product" width="150" />
      <el-table-column prop="SupplierID" label="Supplier" width="150" />
      <!-- -->
      <el-table-column prop="Type" label="Type" width="150" />
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
            @change="changeNumber(scope.$index, scope.row)"
          ></el-input-number>
        </template>
      </el-table-column>
      <!-- -->
      <el-table-column>
        <template #default="scope">
          <el-button size="mini" @click="pressOrder(scope.$index, scope.row)"
            >Order</el-button
          >
        </template>
      </el-table-column>
      <el-table-column>
        <el-select
          v-model="StoreHouses"
          placeholder="Select Type"
          @change="selectHouse"
        >
          <el-option
            v-for="item in StoreHouses"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-table-column>
      <!-- -->
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next"
      :page-size="pageSize"
      :total="this.productTable.length"
      @current-change="setPage"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //number: 5,//should be dynamic and different from others
      page: 1,
      pageSize: 5,
      productTable: [],
      StoreHouses:[],
    };
  },
  methods: {
    changeNumber(index, row) {
      console.log(index);
      console.log(row);
      console.log(this.productTable[index]);
    },
    getStoreHouse(mid) {
      this.axios
        .get("http://127.0.0.1:9000/ni/GetStoreHouseID", {
          params: {
            ManagerID: mid,
          },
        })
        .then((response) => {
          //  get 回來的 資料 處理
          let res = JSON.stringify(response.data); // 先變字串
          let resobj = JSON.parse(res); // 再變 object
          // 就可以做其他處理 像存到data 裡面
          // Date and Oid
          console.log("storehouse", resobj);
          return resobj;
        })
        .catch((error) => {
          console.log(error);
        })
        .then(function () {
          // always executed
        });
      //---------
    },
    ///////////
    pressOrder(index, row) {
      console.log(index);
      console.log(row);
      //------------------------
      let ShopManagerID = this.firebase.auth().currentUser.email;
      let StoreHouseID = this.getStoreHouse(ShopManagerID);
      let SupplierID = row.SupplierID;
      let ProductID = row.ProductID;
      let Num = row.number;

      let add = [StoreHouseID, ShopManagerID, SupplierID, ProductID, Num];
      console.log(add);
      /*
      //post 寫法
      this.axios.post('http://127.0.0.1:9000/nn/orderButton', {
        // post 參數放這裡
        data : this.add
      })
      .catch(error => {
        console.log(error)
        this.error = 'errorl'
        console.log('order error')
      });
      //------------------------
      */
    },
    ////////
    setPage(val) {
      console.log(val);
      this.page = val;
    },
  },
  computed: {
    currentPage() {
      return this.productTable.slice(
        this.pageSize * this.page - this.pageSize,
        this.pageSize * this.page
      );
    },
  },
  created() {
    //get all product
    this.axios
      .get("http://127.0.0.1:9000/ni/Order", {
        params: {
          // no params
        },
      })
      .then((response) => {
        //  get 回來的 資料 處理
        let res = JSON.stringify(response.data); // 先變字串
        let resobj = JSON.parse(res); // 再變 object
        // 就可以做其他處理 像存到data 裡面
        // Date and Oid
        console.log(resobj.data);
        this.productTable = resobj.data;
        for (let i = 0; i < this.productTable.length; i++) {
          this.productTable[i].number = 0;
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .then(function () {
        // always executed
      });
    //---------
  },
};
</script>
<style lang=""></style>
