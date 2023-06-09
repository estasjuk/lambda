const express = require("express");
const ctrl = require("./controllers");
const authenticate = require("./middlewares/authenticate");

const router = express.Router();

router.post("/signup", ctrl.signup);
router.post("/login", ctrl.login);
router.get(/\/me[0-9]/, authenticate, ctrl.getMe1);
router.get("/me/:reqNum", authenticate, ctrl.getMe2);
router.post("/refresh", authenticate, ctrl.refresh);

module.exports = router;