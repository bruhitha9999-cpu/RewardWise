import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./Home.css";

function Home() {
  return (
    <>
      <Navbar />

      <div className="home">

        {/* Hero Section */}
        <section className="hero">
          <div className="hero-content">
            <h1>💳 RewardWise</h1>

            <h2>Credit Card Reward Points Redemption Platform</h2>

            <p>
              RewardWise helps users securely manage multiple credit cards,
              track reward points, redeem rewards, and view redemption history
              from a single dashboard.
            </p>

            <div className="hero-buttons">
              <Link to="/login">
                <button className="login-btn">Login</button>
              </Link>

              <Link to="/signup">
                <button className="signup-btn">Register</button>
              </Link>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="features">

          <div className="feature-card">
            <h2>💳</h2>
            <h3>Manage Credit Cards</h3>
            <p>
              Add, edit and manage multiple credit cards in one secure place.
            </p>
          </div>

          <div className="feature-card">
            <h2>🎁</h2>
            <h3>Reward Points</h3>
            <p>
              Monitor available reward points and redeem them anytime.
            </p>
          </div>

          <div className="feature-card">
            <h2>📜</h2>
            <h3>Redemption History</h3>
            <p>
              View complete redemption history with date and redeemed points.
            </p>
          </div>

          <div className="feature-card">
            <h2>🔒</h2>
            <h3>Secure Login</h3>
            <p>
              JWT-based authentication keeps your account and data protected.
            </p>
          </div>

        </section>

        {/* About */}
        <section className="about">
          <h2>Why RewardWise?</h2>

          <p>
            Credit card users often have reward points spread across multiple
            banks, making them difficult to track and redeem. RewardWise
            provides a centralized platform to manage all reward points,
            simplifying redemption and preventing points from going unused.
          </p>
        </section>

        {/* Statistics */}
        <section className="home-stats">

          <div className="stat-box">
            <h2>100%</h2>
            <p>Secure</p>
          </div>

          <div className="stat-box">
            <h2>∞</h2>
            <p>Multiple Cards</p>
          </div>

          <div className="stat-box">
            <h2>24/7</h2>
            <p>Access Anytime</p>
          </div>

        </section>

      </div>

      <Footer />
    </>
  );
}

export default Home;