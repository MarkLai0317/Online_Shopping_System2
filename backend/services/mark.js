const db = require('../services/db'); // dp 裡的function 用ㄌㄞquery 和 改資料的

const listPerPage = 10

function createNewCustomer(data){
  const {Email, Name, PhoneNum} = data
  const result = db.run('INSERT INTO Customer (CustomerID, Name, PhoneNum) VALUES (@Email, @Name, @PhoneNum)', {Email, Name, PhoneNum});
  let message = 'Error in creating Customer';
  if (result.changes) {
    message = 'Customer created successfully';
  }
  return {message};
}

function searchProduct(shopID, type, page){
  const offset = (page - 1) * listPerPage;
  const data = db.query(`SELECT  Product.ProductID,Product.SupplierID,  For_Sell.ShopID, Product.Name as ProductName, Shop.Name as ShopName
                          FROM Shop INNER JOIN For_Sell ON Shop.ShopID = For_Sell.ShopID 
                          INNER JOIN Product ON Product.ProductID = For_Sell.ProductID 
                                              AND Product.SupplierID = For_Sell.ProductSupplierID
                          WHERE Type = ? AND Shop.ShopID = ?
                          LIMIT ?, ?`, [type, shopID, offset, listPerPage])
  const meta = {page};
  return {
    data,
    meta
  }
}


module.exports = {
  createNewCustomer,
  searchProduct
}