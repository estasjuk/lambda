const axios = require('axios');


const getCoinMarketCapCurrency = async () => {
    const { data } = await axios.get(
        'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest'
        + '?CMC_PRO_API_KEY=bf77236a-1efa-476d-8563-1f5c26dd1aed');
    
    const elements = data.data;

    const baseData = elements.map(el => ({
        symbol: el.symbol,
        price: el.quote.USD.price,
        market: "CoinMarketCap",
    }));

    return baseData;
};

const getCoinBaseCurrency = async () => {
    const { data } = await axios.get(
        'https://api.coinbase.com/v2/exchange-rates',
);

    let baseData = [];

    for (let [key, value] of Object.entries(data.data.rates)) {
        baseData.push({
            symbol: `${key}`,
            price: Number(`${value}`),
            market: "CoinBase"
        })
    };
    return baseData
};

const getCoinStatsCurrency = async () => {
    const { data } = await axios.get(
        'https://api.coinstats.app/public/v1/coins',
);

    const elements = data.coins;

    const baseData = elements.map(el => ({
        symbol: el.symbol,
        price: el.price,
        market: "CoinStats",
    }));
    
    return baseData;
};

const getKucoinCurrency = async () => {
    const { data } = await axios.get(
        'https://api.kucoin.com/api/v1/prices',
);

    let baseData = [];

    for (let [key, value] of Object.entries(data.data)) {
        baseData.push({
            symbol: `${key}`,
            price: Number(`${value}`),
            market: "Kucoin"
        })
    };

    return baseData;
};

const getCoinPaprikaCurrency = async () => {
    const { data } = await axios.get(
        'https://api.coinpaprika.com/v1/tickers',
);

    const baseData = data.map(el => ({
        symbol: el.symbol,
        price: el.quotes.USD.price,
        market: "CoinPaprika",
    }));

    return baseData;
};

module.exports = {
    getCoinMarketCapCurrency,
    getCoinBaseCurrency,
    getCoinStatsCurrency,
    getKucoinCurrency,
    getCoinPaprikaCurrency,
}

