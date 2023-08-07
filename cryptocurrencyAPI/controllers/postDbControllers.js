const { Crypto } = require("../models/crypto");
const controllerWrapper = require("../utils/controllerWrapper");

const {getCoinMarketCapCurrency, 
    getCoinBaseCurrency,
    getCoinStatsCurrency,
    getKucoinCurrency,
    getCoinPaprikaCurrency} = require('../services/crypto-services');

const addCrypto = async () => {
    
    const coinMarketCap = await getCoinMarketCapCurrency();
    const coinBase = await getCoinBaseCurrency();
    const coinStats = await getCoinStatsCurrency();
    const kucoin = await getKucoinCurrency();
    const coinPaprika = await getCoinPaprikaCurrency();

    await Crypto.create(...coinMarketCap, ...coinBase, ...coinStats, ...kucoin, ...coinPaprika);
};


module.exports = {
    addCrypto: controllerWrapper(addCrypto),
}