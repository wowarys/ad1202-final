import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";
import React from "react";
import GameCard from "./game.card.component";
import { gamesData } from "../model/data/games-data";

const Catalog = () => {
  return (
    <section className="bg-white text-black">
      <div className="container">
        <div className="py-5 flex flex-col gap-5">
          <h1 className="text-3xl font-bold">Популярные игры</h1>
          <Tabs defaultValue="all" className="w-full">
            <TabsList>
              <TabsTrigger value="all">Все игры</TabsTrigger>
              <TabsTrigger value="action">Экшен</TabsTrigger>
              <TabsTrigger value="rpg">РПГ</TabsTrigger>
            </TabsList>
            <TabsContent value="all">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                {gamesData.map((game, index) => (
                  <GameCard
                    key={index}
                    id={game.id}
                    title={game.title}
                    description={game.description}
                    category={game.category}
                    price={game.price}
                    discount={game.discount}
                    views={game.views}
                    imageSrc={game.imageSrc}
                    initialLikes={game.likes}
                  />
                ))}
              </div>
            </TabsContent>
            <TabsContent value="action">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6"></div>
            </TabsContent>
            <TabsContent value="rpg">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6"></div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
};

export default Catalog;
