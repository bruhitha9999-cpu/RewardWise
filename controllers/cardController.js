const Card = require("../models/Card");
const Redemption = require("../models/Redemption");

// ==============================
// Add Card
// ==============================
const addCard = async (req, res) => {
  try {
    const { cardName, bankName, cardNumber, rewardPoints } = req.body;

    if (!cardName || !bankName || !cardNumber) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields",
      });
    }

    const card = new Card({
      userId: req.user.id,
      cardName,
      bankName,
      cardNumber,
      rewardPoints,
    });

    await card.save();

    res.status(201).json({
      success: true,
      message: "Card Added Successfully",
      card,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// ==============================
// Get All Cards
// ==============================
const getCards = async (req, res) => {
  try {
    const cards = await Card.find({
      userId: req.user.id,
    });

    res.status(200).json({
      success: true,
      cards,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// ==============================
// Delete Card
// ==============================
const deleteCard = async (req, res) => {
  try {
    const { id } = req.params;

    const card = await Card.findOneAndDelete({
      _id: id,
      userId: req.user.id,
    });

    if (!card) {
      return res.status(404).json({
        success: false,
        message: "Card not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Card Deleted Successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// ==============================
// Update Card
// ==============================
const updateCard = async (req, res) => {
  try {
    const { id } = req.params;
    const { cardName, bankName, cardNumber, rewardPoints } = req.body;

    const updatedCard = await Card.findOneAndUpdate(
      {
        _id: id,
        userId: req.user.id,
      },
      {
        cardName,
        bankName,
        cardNumber,
        rewardPoints,
      },
      {
        new: true,
      }
    );

    if (!updatedCard) {
      return res.status(404).json({
        success: false,
        message: "Card not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Card Updated Successfully",
      card: updatedCard,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// ==============================
// Redeem Reward Points
// ==============================
const redeemPoints = async (req, res) => {
  try {
    const { id } = req.params;
    const { points } = req.body;

    const card = await Card.findOne({
      _id: id,
      userId: req.user.id,
    });

    if (!card) {
      return res.status(404).json({
        success: false,
        message: "Card not found",
      });
    }

    if (Number(points) > card.rewardPoints) {
      return res.status(400).json({
        success: false,
        message: "Insufficient reward points",
      });
    }

    card.rewardPoints -= Number(points);

    await card.save();

    // Save Redemption History
    await Redemption.create({
      userId: req.user.id,
      cardId: card._id,
      cardName: card.cardName,
      redeemedPoints: Number(points),
    });

    res.status(200).json({
      success: true,
      message: "Reward Points Redeemed Successfully",
      card,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

module.exports = {
  addCard,
  getCards,
  deleteCard,
  updateCard,
  redeemPoints,
};