const { Crypto } = require("../models/crypto");
const controllerWrapper = require("../utils/controllerWrapper");
const HttpError = require("../utils/HttpError");
const getTimeRange = require("../services/getTimeRange");


const getCrypto = async (req, res) => {
    const {page = 1, limit = 40, symbol ="", market = "", time = ""} = req.query;
    const skip = (page - 1) * limit;

    const timeRanges = ["15m", "1h", "4h", "24h"];
    let searchTime = 0;

    if (!timeRanges.includes(time)) {
        throw HttpError.BadRequest("Please, enter the valid time range");
    }

    if (time) {
        searchTime = getTimeRange(time);
    };

    const result = await Crypto.find({symbol, market, createdAt: {
        $gte: searchTime} 
    }).limit(limit * 1)
    .skip(skip);

    if (result.length === 0) {
        throw HttpError.NotFoundError("Data not found");
    };

    const totalResult = await Crypto.countDocuments({symbol, market, createdAt: {
        $gte: searchTime} });
    const totalPages = Math.ceil(totalResult / limit);

  res.status(200).json({
      totalResult,
      totalPages,
      page: Number(page),
      limit: Number(limit),
      result,
  });
};

module.exports = {
    getCrypto: controllerWrapper(getCrypto),
}