import React from "react";
import Header from "./components/header.component";
import Footer from "./components/footer.component";
import MainPage from "./pages/main.page";
import { BrowserRouter as Router } from "react-router-dom";
import { Toaster } from "./ui/toaster";

const App = () => {
  return (
    <Router>
      <div className="App flex flex-col">
        <Header />
        <MainPage />
        <Footer />
      </div>
      <Toaster />
    </Router>
  );
};

export default App;
