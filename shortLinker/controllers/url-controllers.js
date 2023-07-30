const {controllerWrapper} = require('../services/controllerWrapper');
const {getShortUrl} = require('../services/getShortUrl');
const HttpError = require('../helpers/HttpError');
const {ShortUrl} = require('../models/url-schema');

const createShortUrl = async (req, res) => {
    const { url } = req.body;
    if (!url) {
        throw new HttpError(400, 'Url is required');
    }
    const result = await getShortUrl(url);
    await ShortUrl.create({ full: url, short: result} )

    res.json({
        status: 'success',
        code: 201,
        result,
    })
};

const linkToShortUrl = async (req, res) => {
    console.log(req.params);
    const {shortUrl} = req.params;
    console.log(shortUrl);
    const result = await ShortUrl.findOne({short: shortUrl})
    if (!result) {
        throw new HttpError(404, 'Short URL not found');
    }

    res.redirect(result.full)
};

module.exports = {
    createShortUrl: controllerWrapper(createShortUrl),
    linkToShortUrl: controllerWrapper(linkToShortUrl),
};