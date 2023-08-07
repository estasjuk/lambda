const express = require('express');
const { getCrypto, deleteCrypto } = require('../controllers/getDbControllers');

const router = express.Router();

router.get('/', getCrypto);
router.delete('/', deleteCrypto);

module.exports = router;