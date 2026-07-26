import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import API from "../services/api";

function EditCard() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    cardName: "",
    bankName: "",
    cardNumber: "",
    rewardPoints: "",
  });

  useEffect(() => {
    fetchCard();
  }, []);

  const fetchCard = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.get("/cards", {
        headers: {
          Authorization: token,
        },
      });

      const card = res.data.cards.find((item) => item._id === id);

      if (card) {
        setFormData({
          cardName: card.cardName,
          bankName: card.bankName,
          cardNumber: card.cardNumber,
          rewardPoints: card.rewardPoints,
        });
      }
    } catch (error) {
      alert("Failed to load card");
    }
  };

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

      await API.put(`/cards/${id}`, formData, {
        headers: {
          Authorization: token,
        },
      });

      alert("Card Updated Successfully");

      navigate("/dashboard");
    } catch (error) {
      alert(error.response?.data?.message || "Update Failed");
    }
  };

  return (
    <>
      <Navbar />

      <div className="form-container">
        <form className="form-box" onSubmit={handleSubmit}>
          <h2>Edit Card</h2>

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

          <button type="submit">Update Card</button>
        </form>
      </div>
    </>
  );
}

export default EditCard;