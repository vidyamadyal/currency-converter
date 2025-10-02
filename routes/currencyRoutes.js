const express = require('express');
const { convertCurrency, getCurrencies } = require('../controllers/currencyController');

const router = express.Router();

router.get('/convert', convertCurrency);
router.get('/currencies', getCurrencies); 

module.exports = router;