const axios = require('axios');

// Fetch conversion rate between two currencies
const fetchConversionRate = async (from, to, date = null) => {
  const baseUrl = process.env.CURRENCY_API_URL || 'https://currencyapi.com/api/v3/latest';
  const url = `${baseUrl}?apikey=${process.env.CURRENCY_API_KEY}&currencies=${to}&base_currency=${from}`;

  try {
    const response = await axios.get(url);
    const rate = response.data.data[to].value;
    return rate;
  } catch (error) {
    console.error('Conversion rate fetch failed:', error.response?.data || error.message);
    throw new Error('Unable to fetch conversion rate');
  }
};

// Fetch list of supported currencies
const fetchCurrencyList = async () => {
  const url = `https://currencyapi.com/api/v3/currencies?apikey=${process.env.CURRENCY_API_KEY}`;

  try {
    const response = await axios.get(url);
    return response.data.data;
  } catch (error) {
    console.error('Currency list fetch failed:', error.response?.data || error.message);
    throw new Error('Unable to fetch currency list');
  }
};

module.exports = {
  fetchConversionRate,
  fetchCurrencyList
};