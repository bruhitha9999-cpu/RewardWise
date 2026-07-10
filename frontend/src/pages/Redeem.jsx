import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import API from "../services/api";

function Redeem() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [points, setPoints] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      await API.put(
        `/cards/redeem/${id}`,
        {
          points: Number(points),
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      alert("Reward Points Redeemed Successfully!");

      navigate("/dashboard");
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
          "Failed to redeem reward points."
      );
    }
  };

  return (
    <>
      <Navbar />

      <div className="form-container">
        <form className="form-box" onSubmit={handleSubmit}>
          <h2>Redeem Reward Points</h2>

          <input
            type="number"
            placeholder="Enter Reward Points"
            value={points}
            onChange={(e) => setPoints(e.target.value)}
            min="1"
            required
          />

          <button type="submit">Redeem</button>
        </form>
      </div>
    </>
  );
}

export default Redeem;