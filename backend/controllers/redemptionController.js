const Redemption = require("../models/Redemption");

const getHistory = async (req, res) => {
  try {
    const history = await Redemption.find({
      userId: req.user.id,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      history,
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
  getHistory,
};