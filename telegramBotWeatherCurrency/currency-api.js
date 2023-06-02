const axios = require('axios');

const instancePrivat = axios.create({
    baseURL: 'https://api.privatbank.ua/p24api/pubinfo?exchange&coursid=5',
});

const instanceMono = axios.create({
    baseURL: 'https://api.monobank.ua/bank/currency',
});

const getPrivatExchange = async () => {
    const response = await instancePrivat.get();
    console.log(response.data);
    return response.data;
};

const getMonoExchange = async () => {
    const response = await instanceMono.get();
    console.log(response.data);
    return response.data;
};

getMonoExchange();

module.exports = {
    getPrivatExchange,
    getMonoExchange,
};

//840 - usd
//978 - eur