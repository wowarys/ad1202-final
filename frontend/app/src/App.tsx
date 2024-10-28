import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Toaster } from "./ui/toaster";
import LoginPage from "./pages/login.page";
import Header from "./components/header.component";
import Footer from "./components/footer.component";
import MainPage from "./pages/main.page";
import RegisterPage from "./pages/register.page";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/sign/in" element={<LoginPage />} />
        <Route path="/sign/up" element={<RegisterPage />} />
        <Route
          path="/*"
          element={
            <>
              <Header />
              <MainPage />
              <Footer />
            </>
          }
        />
      </Routes>
      <Toaster />
    </Router>
  );
};

export default App;
