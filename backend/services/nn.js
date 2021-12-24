const db = require('../services/db'); // dp 裡的function 用ㄌㄞquery 和 改資料的
const listPerPage = 10;


// customer search product
function searchProduct(ShopID, Type, page = 1) {
  const offset = (page - 1) * listPerPage;

  //  have shopid and type
  if (!ShopID && !Type) {
    const data = db.query(`SELECT  Product.ProductID as ProductID, Product.SupplierID as SupplierID, 
                          For_Sell.ShopID as ShopID, Product.Name as ProductName, Shop.Name as ShopName                        
                          FROM Shop INNER JOIN For_Sell ON Shop.ShopID = For_Sell.ShopID 
                          INNER JOIN Product ON Product.ProductID = For_Sell.ProductID 
                                              AND Product.SupplierID = For_Sell.ProductSupplierID
                          
                          LIMIT ?, ?`, [offset, listPerPage]);
    const meta = { page };
    return {
      data,
      meta
    }

    // only have type
  } else if (!ShopID) {
    const data = db.query(`SELECT  Product.ProductID as ProductID, Product.SupplierID as SupplierID, 
                          For_Sell.ShopID as ShopID, Product.Name as ProductName, Shop.Name as ShopName                        
                          FROM Shop INNER JOIN For_Sell ON Shop.ShopID = For_Sell.ShopID 
                          INNER JOIN Product ON Product.ProductID = For_Sell.ProductID 
                                              AND Product.SupplierID = For_Sell.ProductSupplierID
                          WHERE Type = ? 
                          LIMIT ?, ?`, [Type, offset, listPerPage]);
    const meta = { page };
    return {
      data,
      meta
    }

    // only have shopID
  } else if (!Type) {
    const data = db.query(`SELECT  Product.ProductID as ProductID, Product.SupplierID as SupplierID, 
                          For_Sell.ShopID as ShopID, Product.Name as ProductName, Shop.Name as ShopName                        
                          FROM Shop INNER JOIN For_Sell ON Shop.ShopID = For_Sell.ShopID 
                          INNER JOIN Product ON Product.ProductID = For_Sell.ProductID 
                                              AND Product.SupplierID = For_Sell.ProductSupplierID
                          WHERE Shop.ShopID = ?
                          LIMIT ?, ?`, [ShopID, offset, listPerPage]);
    const meta = { page };
    return {
      data,
      meta
    }
  } else {
    const data = db.query(`SELECT  Product.ProductID as ProductID, Product.SupplierID as SupplierID, 
                          For_Sell.ShopID as ShopID, Product.Name as ProductName, Shop.Name as ShopName                        
                          FROM Shop INNER JOIN For_Sell ON Shop.ShopID = For_Sell.ShopID 
                          INNER JOIN Product ON Product.ProductID = For_Sell.ProductID 
                                              AND Product.SupplierID = For_Sell.ProductSupplierID
                          WHERE Type = ? AND Shop.ShopID = ?
                          LIMIT ?, ?`, [Type, ShopID, offset, listPerPage]);
    const meta = { page };
    return {
      data,
      meta
    }
  }
}

// customer click Cart
function clickCart(CustomerID) {
  const data = db.query(`SELECT Cart.CustomerID AS CustomerID, Cart.Num AS NumberInCart, For_Sell.Num AS RemainNumber
                          FROM Cart LEFT JOIN For_Sell ON For_Sell.ShopID = Cart.ShopID 
                          AND For_Sell.ProductSupplierID = Cart.ProductSupplierID
                          AND For_Sell.ProductID = Cart.ProductID
                          WHERE Cart.CustomerID = ?` , [CustomerID]);
  return data
}

function add(addObj) {
  const { CustomerID, ShopID, ProductSupplierID, ProductID } = addObj;
  const mid = db.query(`SELECT ManagerID
                        FROM Shop 
                        WHERE ShopID = ?`, [ShopID]);
  const price = db.query(`SELECT Price
                          FROM For_Sell
                          WHERE ShopID = ? AND ProductSupplierID = ? 
                          AND ProductID = ?`, [ShopID, ProductSupplierID, ProductID]);

  // let object to string
  var s = JSON.stringify(mid[0].ManagerID);
  const ShopManagerID = JSON.parse(s);

  var s = JSON.stringify(price[0].Price);
  const Price = JSON.parse(s);

  const res1 = db.query(`SELECT ShopID
                          FROM Cart
                          WHERE CustomerID = ? AND ShopManagerID = ? AND ProductSupplierID = ? AND ProductID = ?`, [CustomerID, ShopManagerID, ProductSupplierID, ProductID]);
  // return res1[0];
  if (res1[0] != undefined) {
    return 'Product exist already.';
  }
  const Num = 1;
  const result = db.run(`INSERT INTO Cart (CustomerID, ShopManagerID, ShopID, ProductSupplierID, ProductID, Num, Price)
                          VALUES (@CustomerID, @ShopManagerID, @ShopID, @ProductSupplierID, @ProductID, @Num, @Price)`
    , { CustomerID, ShopManagerID, ShopID, ProductSupplierID, ProductID, Num, Price });

  let message = 'Error in creating quote';
  if (result.changes) {
    message = 'add product successfully';
  }

  return { message };
}

// history
function history(CustomerID) {
  const data = db.query(` SELECT Time AS Time, HistoryID AS HistoryID, Product.Name AS ProductName, Shop.Name AS ShopName, Num, Price
                          FROM ( Trade_History LEFT JOIN Product ON Trade_History.ProductSupplierID = Product.SupplierID 
                          AND Trade_History.ProductID = Product.ProductID ) LEFT JOIN Shop ON Trade_History.ShopID = Shop.ShopID
                          WHERE CustomerID = ?` , [CustomerID]);
  return data
}

// +(cart)
function addProductNumInCart(data) {
  const { CustomerID, ShopID, ProductSupplierID, ProductID } = data;

  const result = db.run(` UPDATE Cart
                          SET Num = ( Num + 1 )
                          WHERE CustomerID = @CustomerID AND ShopID = @ShopID AND ProductSupplierID = @ProductSupplierID 
                          AND ProductID = @ProductID`, { CustomerID, ShopID, ProductSupplierID, ProductID });

  let message = 'Error in creating quote';
  if (result.changes) {
    message = 'update product number successfully';
  }

  return { message };
}

// -(cart)
function subtractProductNumInCart(data) {
  const { CustomerID, ShopID, ProductSupplierID, ProductID } = data;

  const result = db.run(` UPDATE Cart
                          SET Num = ( Num - 1 )
                          WHERE CustomerID = @CustomerID AND ShopID = @ShopID AND ProductSupplierID = @ProductSupplierID 
                          AND ProductID = @ProductID`, { CustomerID, ShopID, ProductSupplierID, ProductID });

  let message = 'Error in creating quote';
  if (result.changes) {
    message = 'update product number successfully';
  }

  return { message };
}

// buy
function buy(data) {
  const { CustomerID } = data;

  const res1 = db.query(` SELECT *
                          FROM Cart 
                          WHERE CustomerID = ?` , [CustomerID]);
  if (res1.length == 0) {
    return;
  }
  for (i = 0; i < res1.length; i++) {
    cid = res1[i].CustomerID;
    mid = res1[i].ShopManagerID;
    shopid = res1[i].ShopID;
    supplierid = res1[i].ProductSupplierID;
    pid = res1[i].ProductID;
    num = res1[i].Num;
    price = res1[i].Price;

    // find max hid
    var h = db.query(`SELECT MAX(HistoryID) as hh
                      FROM Trade_History `, []);
    var s = JSON.stringify(h[0].hh);
    var hid = JSON.parse(s);
    hid = hid + 1;
    // add to Trade History
    const result = db.run(` INSERT INTO Trade_History (CustomerID, ShopManagerID, ShopID, ProductSupplierID, ProductID,  HistoryID, Num, Price)
                            VALUES (@cid, @mid, @shopid, @supplierid, @pid, @hid, @num, @price)`,
      { cid, mid, shopid, supplierid, pid, hid, num, price });

    // delete data in cart
    db.run(`DELETE
            FROM Cart
            WHERE CustomerID = @cid AND ShopID = @shopid AND ProductSupplierID = @supplierid AND ProductID = @pid`,
      { cid, shopid, supplierid, pid });

    // update for_sell.num
    db.run(`UPDATE For_Sell
            SET Num = (Num - @num)
            WHERE  ShopID = @shopid AND ProductSupplierID = @supplierid 
            AND ProductID = @pid`, { num, shopid, supplierid, pid });

    // update shop.totalRevenue
    db.run(`UPDATE Shop
            SET TotalRevenue = (TotalRevenue + (@num * @price) )
            WHERE  ShopID = @shopid `, { num, price, shopid });


    hid = hid + 1;
  }

  let message = 'buy the product successfully';
  return { message };

}

// -------------------------------------------------------------------------------------
// orderButton
function orderButton(data) {
  const { ShopManagerID, ProductSupplierID, ProductID, Num } = data;
  // find shopID
  var s = db.query(`SELECT ShopID
                            FROM Shop
                            WHERE ManagerID = ?`, [ShopManagerID]);
  var t = JSON.stringify(s[0].ShopID);
  const ShopID = JSON.parse(t);

  // find max orderHistoryID
  var o = db.query(`SELECT MAX(OrderHistoryID) as oo
                    FROM Order_History `, []);
  var s = JSON.stringify(o[0].oo);
  var OrderHistoryID = JSON.parse(s);
  OrderHistoryID = OrderHistoryID + 1;

  // add data to order history
  db.run(` INSERT INTO Order_History (ShopManagerID, ShopID, ProductSupplierID, ProductID,  OrderHistoryID, Num)
                            VALUES (@ShopManagerID, @ShopID, @ProductSupplierID, @ProductID, @OrderHistoryID, @Num)`,
    { ShopManagerID, ShopID, ProductSupplierID, ProductID, OrderHistoryID, Num });

  // update have product number
  // if data doesn't exist in Have, new a row in Have------------------==============================
  const res = db.query(` SELECT *
                          FROM Have 
                          WHERE CustomerID = ?` , [CustomerID]);

  const result = db.run(` UPDATE Have
                          SET Num = Num + @Num
                          WHERE ShopManagerID = @ShopManagerID AND ProductSupplierID = @ProductSupplierID 
                          AND ProductID = @ProductID`, { Num, ShopManagerID, ProductSupplierID, ProductID });

  let message = 'Error in updating forSale product number';
  if (result.changes) {
    message = 'update store house product number successfully';
  }


  return { message };
}

// pageOrderHistory
function pageOrderHistory(ManagerID, page = 1) {
  const offset = (page - 1) * listPerPage;
  const data = db.query(` SELECT Time, OrderHistoryID, Product.Name AS ProductName, Supplier.Name AS SupplierName, Num
                          FROM ( Order_History LEFT JOIN Product ON Order_History.ProductSupplierID = Product.SupplierID 
                          AND Order_History.ProductID = Product.ProductID ) LEFT JOIN Supplier ON Product.SupplierID = Supplier.SupplierID
                          WHERE ShopManagerID = ?
                          LIMIT ?, ?` , [ManagerID, offset, listPerPage]);
  return data
}

// pageTradeHistory
function pageTradeHistory(ManagerID, page = 1) {
  const offset = (page - 1) * listPerPage;
  const data = db.query(` SELECT Time, HistoryID, Product.Name AS ProductName, Price, Num
                          FROM ( Trade_History LEFT JOIN Product ON Trade_History.ProductSupplierID = Product.SupplierID 
                          AND Trade_History.ProductID = Product.ProductID ) 
                          WHERE ShopManagerID = ?
                          LIMIT ?, ?` , [ManagerID, offset, listPerPage]);
  return data
}

// forSale
function forSale(data) {
  const { ShopManagerID, ProductSupplierID, ProductID, Num } = data;

  const result = db.run(` UPDATE For_Sell
                          SET Num = @Num
                          WHERE ShopManagerID = @ShopManagerID AND ProductSupplierID = @ProductSupplierID 
                          AND ProductID = @ProductID`, { Num, ShopManagerID, ProductSupplierID, ProductID });

  let message = 'Error in updating forSale product number';
  if (result.changes) {
    message = 'update forSale product number successfully';
  }

  return { message };
}
module.exports = {
  searchProduct, clickCart, add, history, addProductNumInCart, subtractProductNumInCart, buy,
  orderButton, pageOrderHistory, pageTradeHistory, forSale
}