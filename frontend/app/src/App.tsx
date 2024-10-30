import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Toaster } from "./ui/toaster";
import LoginPage from "./pages/login.page";
import RegisterPage from "./pages/register.page";
import Header from "./components/header.component";
import Footer from "./components/footer.component";
import MainPage from "./pages/main.page";
import NotFoundPage from "./pages/not.found.page";
import GameDetail from "./pages/game.detail.page";

const App = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Routes>
          <Route path="/sign/in" element={<LoginPage />} />
          <Route path="/sign/up" element={<RegisterPage />} />

          <Route
            path="*"
            element={
              <>
                <Header />
                <main className="flex-grow">
                  <Routes>
                    <Route path="/" element={<MainPage />} />
                    <Route path="/games/:id" element={<GameDetail />} />
                    <Route path="*" element={<NotFoundPage />} />
                  </Routes>
                </main>
                <Footer />
              </>
            }
          />
        </Routes>
        <Toaster />
      </div>
    </Router>
  );
};

export default App;
