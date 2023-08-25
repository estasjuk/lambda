const axios = require('axios');

const instance = axios.create({
  baseURL: 'https://crypto-1ekc.onrender.com',
});

const getCurrencies = async () => {
    const { data } = await instance.get();
    return data.result;
};

const getDetails = async (time, symbol) => {
  const { data } = await instance.get(`/?time=${time}&symbol=${symbol}`);
  return data.result;
};

module.exports = {
  getCurrencies,
  getDetails,
};