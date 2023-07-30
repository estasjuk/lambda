const { createHmac } = require('node:crypto');
const getShortUrl = (url) => {

    const secret = 'abcdefg';
    const hash = createHmac('sha256', secret).update(url).digest('hex');
    return hash.slice(5, 10)
};

module.exports = {
    getShortUrl,
};