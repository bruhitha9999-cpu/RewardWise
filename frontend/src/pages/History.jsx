import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import API from "../services/api";

function History() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.get("/history", {
        headers: {
          Authorization: token,
        },
      });

      setHistory(res.data.history);
    } catch (error) {
      console.log(error);
      alert("Failed to fetch history");
    }
  };

  return (
    <>
      <Navbar />

      <div className="history-container">
        <h2>Reward Redemption History</h2>

        {history.length === 0 ? (
          <h3>No redemption history found.</h3>
        ) : (
          history.map((item) => (
            <div className="history-card" key={item._id}>
              <h3>{item.cardName}</h3>

              <p>
                <strong>Redeemed Points:</strong> {item.redeemedPoints}
              </p>

              <p>
                <strong>Date:</strong>{" "}
                {new Date(item.createdAt).toLocaleString()}
              </p>
            </div>
          ))
        )}
      </div>
    </>
  );
}

export default History;