import React from "react";
import { Route, Routes } from "react-router-dom";
import RegisterPage from "../../pages/User/RegisterPage";
import LoginPage from "../../pages/User/LoginPage";
import ForgotPasswordPage from "../../pages/User/ForgotPage";
import VerifyOtpPage from "../../pages/User/VerifyOptPage";
import UserDashboardPage from "../../pages/User/UserDashboard";
import UserProfilePage from "../../pages/User/UserProfilePage";
import HomePage from "../../pages/HomePage";

const User = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="login" element={<LoginPage />} />

        <Route path="forgot" element={<ForgotPasswordPage />} />
        <Route path="verify" element={<VerifyOtpPage />} />

        <Route path="dashboard" element={<UserDashboardPage />} />
        <Route path="profile" element={<UserProfilePage />} />
      </Routes>
    </>
  );
};

export default User;
