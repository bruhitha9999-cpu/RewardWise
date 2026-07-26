import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import API from "../services/api";

function AddCard() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    cardName: "",
    bankName: "",
    cardNumber: "",
    rewardPoints: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      await API.post("/cards", formData, {
        headers: {
          Authorization: token,
        },
      });

      alert("Card Added Successfully");
      navigate("/dashboard");
    } catch (error) {
      alert(error.response?.data?.message || "Failed to Add Card");
    }
  };

  return (
    <>
      <Navbar />

      <div className="form-container">
        <form className="form-box" onSubmit={handleSubmit}>
          <h2>Add Credit Card</h2>

          <input
            type="text"
            name="cardName"
            placeholder="Card Name"
            value={formData.cardName}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="bankName"
            placeholder="Bank Name"
            value={formData.bankName}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="cardNumber"
            placeholder="Card Number"
            value={formData.cardNumber}
            onChange={handleChange}
            required
          />

          <input
            type="number"
            name="rewardPoints"
            placeholder="Reward Points"
            value={formData.rewardPoints}
            onChange={handleChange}
            required
          />

          <button type="submit">Add Card</button>
        </form>
      </div>
    </>
  );
}

export default AddCard;