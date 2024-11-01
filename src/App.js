import "./App.css";
import LoginPage from "./authComp/LoginPage";
import SignupPage from "./authComp/SignupPage";
import LandingPage from "./LandingPage";
import NavBar from "./NavBar";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Routes>
    </Router>
  );
}

export default App;
