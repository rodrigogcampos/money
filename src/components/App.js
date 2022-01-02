import React from "react";
import Signup from "./Signup";
import Login from "./Login";
import ForgotPassword from './ForgotPassword'
import Dashboard from "./Dashboard";
import UpdateProfile from './UpdateProfile'
import PrivateRoute from './PrivateRoute';
import { AuthProvider } from "../contexts/AuthContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import '../styles/app.scss';

function App() {
  return (
    <div className="main-container">
      <Router>
        <AuthProvider>
          <Routes>
            <Route exact path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
            <Route path="/update-profile" element={<PrivateRoute><UpdateProfile /></PrivateRoute>} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  )
}

export default App;
