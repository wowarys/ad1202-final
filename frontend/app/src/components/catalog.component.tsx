import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";
import React, { useEffect, useState } from "react";
import GameCard from "./game.card.component";
import { GetAllProducts, getAllLikes, likeProduct } from "../api/api";
import { IGameDetails } from "../model/types/games";
import Loader from "./loader.component";

const Catalog = () => {
  const [loading, setLoading] = useState(true);
  const [gamesData, setGamesData] = useState<IGameDetails[]>([]);

  useEffect(() => {
    const fetchDataAndLikes = async () => {
      try {
        const [data, likes] = await Promise.all([
          GetAllProducts(),
          getAllLikes(),
        ]);

        const likeMap = new Map(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          likes.map((like: any) => [like.product_id.toString(), like.liked])
        );

        const gamesWithLikes = data.map((game: IGameDetails) => ({
          ...game,
          liked: likeMap.get(game.id.toString()) || false,
        }));

        setGamesData(gamesWithLikes);
      } catch (error) {
        console.error("Ошибка при получении данных", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDataAndLikes();
  }, []);

  if (loading) {
    return <Loader />;
  }

  const handleLikeToggle = async (gameId: number) => {
    try {
      const response = await likeProduct(gameId);
      setGamesData((prevGames) =>
        prevGames.map((game) =>
          game.id === gameId
            ? { ...game, likes: response.likes, liked: response.liked }
            : game
        )
      );
    } catch (error) {
      console.error("Ошибка при переключении лайка:", error);
    }
  };

  const renderGameCard = (game: IGameDetails) => (
    <GameCard
      key={game.id}
      id={Number(game.id)}
      title={game.title}
      description={game.description}
      category={game.category}
      price={game.price}
      discount={game.discount}
      views={game.views}
      imageSrc={game.imageSrc}
      likes={game.likes}
      liked={game.liked}
      onLikeToggle={handleLikeToggle}
    />
  );

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
              <TabsTrigger value="adventure">Приключения</TabsTrigger>
              <TabsTrigger value="openworld">Открытый мир</TabsTrigger>
              <TabsTrigger value="shooter">Шутер</TabsTrigger>
              <TabsTrigger value="horror">Хоррор</TabsTrigger>
              <TabsTrigger value="mystic">Мистика</TabsTrigger>
              <TabsTrigger value="hardcore">Хардкор</TabsTrigger>
              <TabsTrigger value="stealth">Стелс</TabsTrigger>
              <TabsTrigger value="strategy">Стратегия</TabsTrigger>
            </TabsList>
            <TabsContent value="all">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                {gamesData.map(renderGameCard)}
              </div>
            </TabsContent>
            <TabsContent value="action">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                {gamesData
                  .filter((game) => game.category.includes("Экшен"))
                  .map(renderGameCard)}
              </div>
            </TabsContent>
            <TabsContent value="rpg">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                {gamesData
                  .filter((game) => game.category.includes("RPG"))
                  .map(renderGameCard)}
              </div>
            </TabsContent>
            <TabsContent value="adventure">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                {gamesData
                  .filter((game) => game.category.includes("Приключения"))
                  .map(renderGameCard)}
              </div>
            </TabsContent>
            <TabsContent value="openworld">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                {gamesData
                  .filter((game) => game.category.includes("Открытый мир"))
                  .map(renderGameCard)}
              </div>
            </TabsContent>
            <TabsContent value="shooter">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                {gamesData
                  .filter((game) => game.category.includes("Шутер"))
                  .map(renderGameCard)}
              </div>
            </TabsContent>
            <TabsContent value="horror">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                {gamesData
                  .filter((game) => game.category.includes("Хоррор"))
                  .map(renderGameCard)}
              </div>
            </TabsContent>
            <TabsContent value="mystic">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                {gamesData
                  .filter((game) => game.category.includes("Мистика"))
                  .map(renderGameCard)}
              </div>
            </TabsContent>
            <TabsContent value="hardcore">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                {gamesData
                  .filter((game) => game.category.includes("Хардкор"))
                  .map(renderGameCard)}
              </div>
            </TabsContent>
            <TabsContent value="stealth">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                {gamesData
                  .filter((game) => game.category.includes("Стелс"))
                  .map(renderGameCard)}
              </div>
            </TabsContent>
            <TabsContent value="strategy">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                {gamesData
                  .filter((game) => game.category.includes("Стратегия"))
                  .map(renderGameCard)}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
};

export default Catalog;
