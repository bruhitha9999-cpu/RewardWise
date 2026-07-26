const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");

const {
  getHistory,
} = require("../controllers/redemptionController");

router.get("/history", auth, getHistory);

module.exports = router;