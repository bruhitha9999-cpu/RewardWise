const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");

const {
  addCard,
  getCards,
  deleteCard,
  updateCard,
  redeemPoints,
} = require("../controllers/cardController");

router.post("/cards", auth, addCard);
router.get("/cards", auth, getCards);
router.put("/cards/:id", auth, updateCard);
router.delete("/cards/:id", auth, deleteCard);
router.put("/cards/redeem/:id", auth, redeemPoints);
module.exports = router;