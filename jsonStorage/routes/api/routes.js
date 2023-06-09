require("dotenv").config();
const express = require('express');

const router = express.Router();

const {addJson, getJson} = require('../../controllers/route-controllers');

router.get('/:route', getJson);
router.post('/*', addJson);


module.exports = router;