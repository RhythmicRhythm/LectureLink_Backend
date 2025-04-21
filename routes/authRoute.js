const express = require("express");
const router = express.Router();
const {
    signup,
    signin,
    authStatus,
    signOut,
  } = require("../controllers/authController");

router.post("/sign-up", signup);
router.post("/sign-in", signin);
router.get("/auth-status", authStatus);
router.post("/sign-out", signOut);

module.exports = router;