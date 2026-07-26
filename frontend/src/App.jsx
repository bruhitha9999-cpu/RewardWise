import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AddCard from "./pages/AddCard";
import EditCard from "./pages/EditCard";
import Redeem from "./pages/Redeem";
import History from "./pages/History";
import NotFound from "./pages/NotFound";


function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/add-card" element={<AddCard />} />
      <Route path="/edit-card/:id" element={<EditCard />} />
      <Route path="/redeem/:id" element={<Redeem />} />
      <Route path="/history" element={<History />} />
      <Route path="*" element={<NotFound />} />
      <Route path="/history" element={<History />} />
    </Routes>
  );
}

export default App;