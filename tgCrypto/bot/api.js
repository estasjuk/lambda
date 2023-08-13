const axios = require('axios');

const instance = axios.create({
  baseURL: 'https://localhost:5001/',
});

const getCurrencies = async () => {
    const { data } = await getCrypto();
    return data.list;
};

module.exports = {
  getCurrencies,
};