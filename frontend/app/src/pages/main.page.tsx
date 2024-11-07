import React from "react";
import Hero from "../components/hero.component";
import Catalog from "../components/catalog.component";
import CatalogRecommended from "../components/catalog.recommended.component";
import CatalogRecommendedCosine from "../components/catalog.recommended.cosine.component";

const MainPage = () => {
  return (
    <>
      <Hero />
      <Catalog />
      <CatalogRecommended />
      <CatalogRecommendedCosine />
    </>
  );
};

export default MainPage;
