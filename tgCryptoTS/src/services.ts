const { getCurrencies, getDetails } = require("./api");
import { BaseData } from "api";

const createCurrencyInterface = async () => {
    try {
        const currencies: BaseData[] = await getCurrencies();
        const listRecent: String[] = currencies.map(currency => {
            return `/${currency.symbol} $${currency.price} \n`
        })
        const result = listRecent.join().replace(/,/g, '')
        return result
    }
    catch (error) {
        console.log(error.message);
    }
};

const getDetailInfo = async (time: string, symbol: string) => {
    try {
        const details: BaseData[] = await getDetails(time, symbol);
        const info: String[] = details.map(detail => {
            const result = `${detail.createdAt} $${detail.price} \n`
            return result
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

export {}