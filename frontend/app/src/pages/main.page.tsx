import React from "react";
import Hero from "../components/hero.component";
import Catalog from "../components/catalog.component";
import CatalogRecommended from "../components/catalog.recommended.component";

const MainPage = () => {
  return (
    <>
      <Hero />
      <Catalog />
      <CatalogRecommended />
    </>
  );
};

export default MainPage;
