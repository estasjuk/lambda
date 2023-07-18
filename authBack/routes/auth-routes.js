const express = require("express");
const ctrl = require("../controllers/auth");
const authenticate = require("../middlewares/authenticate");

const router = express.Router();

router.post("/signup", ctrl.signup);
router.post("/login", ctrl.login);
router.get(/\/me[0-9]/, authenticate, ctrl.getMe1);
router.get("/me/:reqNum", authenticate, ctrl.getMe2);
router.post("/refresh", ctrl.refresh);
router.get("/logout", authenticate, ctrl.logout);

module.exports = router;