import React from "react";
import Hero from "../components/hero.component";
import Catalog from "../components/catalog.component";
import { Route, Routes } from "react-router-dom";
import GameDetail from "./game.detail.page";

const MainPage = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <Hero />
            <Catalog />
          </>
        }
      />
      <Route path="/games/:id" element={<GameDetail />} />
    </Routes>
  );
};

export default MainPage;
