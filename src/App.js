import "./App.css";
import AccessDenied from "./authComp/AccessDenied";
import LoginPage from "./authComp/LoginPage";
import SignupPage from "./authComp/SignupPage";
import LandingPage from "./LandingPage";
import AboutPage from "./AboutPage";
import NavBar from "./NavBar";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Notes from "./notesComp/Notes";
import ProtectedRoute from "./authComp/ProtectedRoute";
import NoteDetails from "./notesComp/NoteDetails";
import CreateNote from "./notesComp/CreateNote";
import ContactPage from "./ContactPage";
import Admin from "./AdminComp/Admin";
import ForgotPassword from "./authComp/ForgotPassword";
import ResetPassword from "./authComp/ResetPassword";
import OAuth2Redirect from "./authComp/OAuth2Redirect";

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route
          path="/create-note"
          element={
            <ProtectedRoute>
              <CreateNote />
            </ProtectedRoute>
          }
        />
        <Route
          path="/notes"
          element={
            <ProtectedRoute>
              <Notes />
            </ProtectedRoute>
          }
        />
        <Route
          path="/notes/:id"
          element={
            <ProtectedRoute>
              <NoteDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute adminPage={true}>
              <Admin />
            </ProtectedRoute>
          }
        />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contacts" element={<ContactPage />} />
        <Route path="/access-denied" element={<AccessDenied />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/oauth2/redirect" element={<OAuth2Redirect />} />
      </Routes>
    </Router>
  );
}

export default App;
