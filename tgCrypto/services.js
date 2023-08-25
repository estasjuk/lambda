const { getCurrencies, getDetails } = require("./api");

const createCurrencyInterface = async () => {
    try {
        const currencies = await getCurrencies();
        const listRecent = currencies.map(currency => {
            return `/${currency.symbol} $${currency.price} \n`
        })
        return listRecent.join().replace(/,/g, '')
    }
    catch (error) {
        console.log(error.message);
    }
};

const getDetailInfo = async (time, symbol) => {
    try {
        const details = await getDetails(time, symbol);
        const info = details.map(detail => {
            return `${detail.createdAt} $${detail.price} \n`
        })
        return `The detail info about average price of ${symbol} during last ${time}:\n${info.join().replace(/,/g, '')}`
        
    }
    catch (error) {
        console.log(error.message);
    }
};

module.exports = {
    createCurrencyInterface,
    getDetailInfo,
}