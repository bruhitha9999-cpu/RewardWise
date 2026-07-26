import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import API from "../services/api";

function Dashboard() {
  const navigate = useNavigate();

  const [cards, setCards] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetchCards();
  }, []);

  // Fetch Cards
  const fetchCards = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.get("/cards", {
        headers: {
          Authorization: token,
        },
      });

      setCards(res.data.cards);
    } catch (error) {
      console.log(error);
      alert("Failed to fetch cards");
    }
  };

  // Delete Card
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this card?")) {
      return;
    }

    try {
      const token = localStorage.getItem("token");

      await API.delete(`/cards/${id}`, {
        headers: {
          Authorization: token,
        },
      });

      alert("Card Deleted Successfully");

      fetchCards();
    } catch (error) {
      alert(error.response?.data?.message || "Delete Failed");
    }
  };

  // Logout
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  // Dashboard Statistics
  const totalCards = cards.length;

  const totalRewardPoints = cards.reduce(
    (sum, card) => sum + Number(card.rewardPoints),
    0
  );

  const highestRewardPoints =
    cards.length > 0
      ? Math.max(...cards.map((card) => Number(card.rewardPoints)))
      : 0;

  return (
    <>
      <Navbar />
      <div className="stat-card">
  <h2>
    {cards.length > 0
      ? (
          totalRewardPoints / cards.length
        ).toFixed(0)
      : 0}
  </h2>
  <p>Average Reward Points</p>
</div>

      <div className="dashboard">

        {/* Header */}
        <div className="dashboard-header">
          <div>
            <h2>Welcome, {user?.name} 👋</h2>
            <p>Manage all your credit cards and reward points.</p>
          </div>

          <div className="dashboard-buttons">
            <Link to="/add-card">
              <button className="primary-btn">+ Add Card</button>
            </Link>

            <button className="logout-btn" onClick={logout}>
              Logout
            </button>
          </div>
        </div>

        {/* Statistics */}
        <div className="stats-container">

          <div className="stat-card">
            <h2>{totalCards}</h2>
            <p>Total Cards</p>
          </div>

          <div className="stat-card">
            <h2>{totalRewardPoints}</h2>
            <p>Total Reward Points</p>
          </div>

          <div className="stat-card">
            <h2>{highestRewardPoints}</h2>
            <p>Highest Reward Points</p>
          </div>

        </div>

        {/* Cards */}
        <div className="cards-container">
          {cards.length === 0 ? (
            <h3>No Cards Added Yet</h3>
          ) : (
            cards.map((card) => (
              <div className="credit-card" key={card._id}>

                <h3>{card.cardName}</h3>

                <p>
                  <strong>Bank:</strong> {card.bankName}
                </p>

                <p>
                  <strong>Card Number:</strong> **** **** ****{" "}
                  {card.cardNumber.slice(-4)}
                </p>

                <p>
                  <strong>Reward Points:</strong> {card.rewardPoints}
                </p>

                <div className="card-buttons">

                  <Link to={`/edit-card/${card._id}`}>
                    <button className="edit-btn">
                      ✏️ Edit
                    </button>
                  </Link>

                  <button
                    className="redeem-btn"
                    onClick={() => navigate(`/redeem/${card._id}`)}
                  >
                    🎁 Redeem
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(card._id)}
                  >
                    🗑 Delete
                  </button>

                </div>

              </div>
            ))
          )}
        </div>

      </div>
    </>
  );
}

export default Dashboard;