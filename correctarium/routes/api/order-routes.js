const express = require('express');

const getOrderDetails = require('../../controllers');

const router = express.Router();

router.get('/', getOrderDetails);

module.exports = router;