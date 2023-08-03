const express = require('express');
const { getCrypto } = require('../controllers/getDbControllers');

const router = express.Router();

router.get('/', getCrypto);

module.exports = router;