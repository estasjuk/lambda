const { Crypto } = require("../models/crypto");
const controllerWrapper = require("../utils/controllerWrapper");
const HttpError = require("../utils/HttpError");
const getTimeRange = require("../services/getTimeRange");

const getCrypto = async (req, res) => {
    const {page = 1, limit = 40, symbol, market, time} = req.query;
    const skip = (page - 1) * limit;

    const timeRanges = ["15m", "1h", "4h", "24h"];
    let searchTime = 0;
    let result = [];
    let totalResult = 0;

    if (!timeRanges.includes(time)) {
            throw HttpError.BadRequest("Please, enter the valid time range");
    }
    
    searchTime = getTimeRange(time);

    if (!market) {
        const rawResult = await Crypto.find({symbol, createdAt: {
            $gte: searchTime} 
        }).limit(limit * 1)
        .skip(skip);

        const formattedRes = rawResult.map(el => ({symbol: el.symbol, price: el.price, createdAt: el.createdAt.toString().slice(0,21)}));

        const arrays = formattedRes.reduce((a, c) => {
            let idx = a.findIndex(e => e[0].createdAt === c.createdAt);
            if (idx !== -1) a[idx].push(c);
            else a.push([c]);
            return a;
        }, []);
        

        result = arrays.map(elem => 
            {
                const sum = elem.reduce((total, el) => {
                return (total + el.price)}, 0);
            return ({symbol: elem[0].symbol, price: sum/elem.length, createdAt: elem[0].createdAt})
            }
        );



        if (result.length === 0) {
            throw HttpError.NotFoundError("Data not found");
        };

        totalResult = result.length;
    } else {
        result = await Crypto.find({symbol, market, createdAt: {$gte: searchTime}}).limit(limit * 1).skip(skip);

        if (result.length === 0) {
            throw HttpError.NotFoundError("Data not found");
        };

        totalResult = await Crypto.countDocuments({symbol, market, createdAt: {
            $gte: searchTime} });
    }
    
    const totalPages = Math.ceil(totalResult / limit);

    res.status(200).json({
        totalResult,
        totalPages,
        page: Number(page),
        limit: Number(limit),
        result,
    });
};

const deleteCrypto = async (req, res) =>  {
    await Crypto.deleteMany({});

    res.status(200).json({
        message: "Ok",
    });
}

module.exports = {
    getCrypto: controllerWrapper(getCrypto),
    deleteCrypto: controllerWrapper(deleteCrypto),
}