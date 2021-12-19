const db = require('../services/db'); // dp 裡的function 用ㄌㄞquery 和 改資料的


function createNewCustomer(data){
  const {Email, Name, PhoneNumber} = data
  const result = db.run('INSERT INTO Customer (CustomerID, Name, PhoneNumber) VALUES (@Email, @Name, @PhoneNumber)', {Email, Name, PhoneNumber});
  let message = 'Error in creating Customer';
  if (result.changes) {
    message = 'Customer created successfully';
  }
  return {message};
}


module.exports = {
  createNewCustomer,
}