const express = require("express");
const ctrl = require("./controllers");

const router = express.Router();

router.post("/signup", ctrl.signup);
router.post("/login", ctrl.login);
// router.get("/refresh", ctrl.refresh);

module.exports = router;