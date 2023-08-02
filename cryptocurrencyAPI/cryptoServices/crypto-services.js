const axios = require('axios');


const getCoinMarketCapCurrency = async () => {
    const { data } = await axios.get(
        'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest'
        + '?CMC_PRO_API_KEY=bf77236a-1efa-476d-8563-1f5c26dd1aed',
);
    console.log(data);
    return data;
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

    console.log(baseData);
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
    console.log(baseData);
    return baseData;
};
//getCoinMarketCapCurrency();
//getCoinBaseCurrency();
//getCoinStatsCurrency();
