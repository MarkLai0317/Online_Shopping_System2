const express = require('express');
const router = express.Router();
const mark = require('../services/mark');

router.post('/register/Customer', function(req, res, next) {
  try {
    res.json(mark.createNewCustomer(req.body));
  } catch(err) {
    console.error(`Error while adding customer `, err.message);
    next(err);
  }
});


module.exports = router;