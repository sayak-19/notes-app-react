import "./App.css";
import AccessDenied from "./authComp/AccessDenied";
import LoginPage from "./authComp/LoginPage";
import SignupPage from "./authComp/SignupPage";
import LandingPage from "./LandingPage";
import NavBar from "./NavBar";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Notes from "./notesComp/Notes";
import ProtectedRoute from "./authComp/ProtectedRoute";

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route
          path="/notes"
          element={
            <ProtectedRoute>
              <Notes />
            </ProtectedRoute>
          }
        />
        <Route path="/access-denied" element={<AccessDenied />} />
      </Routes>
    </Router>
  );
}

export default App;
