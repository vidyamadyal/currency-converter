const { fetchConversionRate, fetchCurrencyList } = require('../services/currencyService');


const convertCurrency = async (req, res) => {
  const { from, to, amount, date } = req.query;
  try {
    const rate = await fetchConversionRate(from, to, date);
    const result = parseFloat(amount) * rate;
    res.json({ from, to, amount: parseFloat(amount), rate, result, date: date || new Date().toISOString().slice(0, 10) });
  } catch (error) {
    res.status(500).json({ error: 'Conversion failed' });
  }
};

const getCurrencies = async (req, res) => {
  try {
    const symbols = await fetchCurrencyList();
    res.json(symbols);
  } catch (error) {
    console.error('Currency fetch failed:', error.message);
    res.status(500).json({ error: 'Failed to fetch currencies' });
  }
};

module.exports = { convertCurrency, getCurrencies };