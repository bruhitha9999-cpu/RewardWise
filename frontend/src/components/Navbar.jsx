import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/dashboard" className="logo-link">
          💳 RewardWise
        </Link>
      </div>

      <div className="nav-links">
        <Link to="/dashboard">Dashboard</Link>

        <Link to="/add-card">Add Card</Link>

        <Link to="/history">History</Link>

        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;