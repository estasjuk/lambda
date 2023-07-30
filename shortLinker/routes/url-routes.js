const express = require('express');

const { createShortUrl, linkToShortUrl } = require('../controllers/url-controllers');

const router = express.Router();

router.post('/', createShortUrl);
router.get('/:shortUrl', linkToShortUrl);

module.exports = router;