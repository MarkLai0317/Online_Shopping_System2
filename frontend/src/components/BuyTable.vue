<template>
<div>
    <td nowrap>select type: </td>
    <el-select v-model="TypeValue" placeholder="Select Type" @change="selectType">
      <el-option
        v-for="item in TypeOptions"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>

    <td nowrap>select shop: </td>
    <el-select v-model="ShopValue" placeholder="Select Type" @change="selectShop">
      <el-option
        v-for="item in ShopOptions"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>

  <el-table :data="currentPage" style="width: 100%">
    
    <el-table-column fixed prop="ProductName" label="Product" width="150" />
    <el-table-column prop="ShopName" label="Shop" width="150" />
    <el-table-column prop="RemainNumber" label="Remain" width="150"/>
    <el-table-column prop="Price" label="Price" width="150"/>
    <el-table-column prop="Type" label="Type" width="150"/>
    <!-- -->
    <el-table-column>
      <template #default="scope">
        <el-button
          size="mini"
          @click="pressAdd(scope.$index, scope.row)">Add</el-button>
      </template>
    </el-table-column>
    <!-- -->

  </el-table>
  <el-pagination
    background
    layout="prev, pager, next"
    :page-size="pageSize"
    :total="totalPage"
    @current-change="getPage">
  </el-pagination>
  <!-- test button -->
     
</div>
</template>

<script >
export default {
  data() {
    return {
      page: 1,
      totalPage: 50,
      pageSize: 10,
      currentType: '',
      currentShopName: '', 
      currentPage: [],
      TypeValue: '',
      ShopValue: '',
      // api
      TypeOptions: [{
          value: 'fruit',
          label: 'fruit'
        }, {
          value: 'shoes',
          label: 'shoes'
        }, {
          value: '',
          label: 'all'
        }
      ],
      ShopOptions: [{
          value: 'shop91',
          label: 'shop91'
        }, {
          value: 'shop92',
          label: 'shop92'
        }, {
          value: '',
          label: 'all'
        },
      ]

      
    }
  },
  created(){
    this.getPage(1)
  },
  methods: {

    getPage(val) {

      this.page = val
      //get 寫法
      this.axios.get('http://127.0.0.1:9000/nn/searchProduct', {
        params: {
          //get 參數放這裡
          ShopID: this.currentShopName, // ShopName ---
          Type: this.currentType,
          page: val
        }
      })
      .then(response=> {//  get 回來的 資料 處理
        let res = JSON.stringify(response.data); // 先 變字串
        let resobj = JSON.parse(res) // 再變 object
        this.currentPage = resobj.data
        // 就可以做其他處理 像存到data 裡面
        console.log(resobj.data)
        console.log(this.productTable)
        console.log(val)
      })
      .catch(error => {
        console.log(error);
      })
      .then(function () {
        // always executed
      })
    },
    ///////////
    pressAdd(index,row) {
      console.log(index)
      console.log(row)
    },
    ////////
    selectType(val){
      this.currentType = val
      this.getPage(this.page)
    },
    selectShop(val){
      this.currentShopName = val
      this.getPage(this.page)
    }
    
  },
  computed: {
    /*
    currentPage: function(){
      let temp = {
        Price: this.productTable.Price,
        Product: this.productTable.ProductName,
        Shop: this.productTable.ShopID,
        RemainNumber: this.productTable.RemainNumber,
        Type: this.productTable.Type
      };
      return temp
    }
    */
    
  }
}
</script>
<style lang="">
  
</style>