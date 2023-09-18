const axios = require('axios');

const instance = axios.create({
  baseURL: 'https://crypto-1ekc.onrender.com',
});

export type BaseData = {
  symbol: string,
  price: number,
  createdAt: string,
};

const getCurrencies = async ()  => {
    const { data } = await instance.get();
    const result: BaseData[] = data.result
    return result;
};

const getDetails = async (time, symbol) => {
  const { data } = await instance.get(`/?time=${time}&symbol=${symbol}`);
  const result: BaseData[] = data.result
  return result;
};

module.exports = {
  getCurrencies,
  getDetails,
}

export {}