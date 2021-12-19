const db = require('../services/db'); // dp 裡的function 用ㄌㄞquery 和 改資料的


function createNewCustomer(data){
  const {Email, Name, PhoneNum} = data
  const result = db.run('INSERT INTO Customer (CustomerID, Name, PhoneNum) VALUES (@Email, @Name, @PhoneNum)', {Email, Name, PhoneNum});
  let message = 'Error in creating Customer';
  if (result.changes) {
    message = 'Customer created successfully';
  }
  return {message};
}


module.exports = {
  createNewCustomer,
}