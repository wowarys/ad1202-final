import React, { useEffect, useState } from "react";
import GameCard from "./game.card.component";
import { getUserRecommendations } from "../api/api";
import { IGameDetails } from "../model/types/games";
import Loader from "./loader.component";

const CatalogRecommended = () => {
  const [loading, setLoading] = useState(true);
  const [gamesData, setGamesData] = useState<IGameDetails[]>([]);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const data = await getUserRecommendations();
        setGamesData(data);
      } catch (error) {
        console.error("Ошибка при получении рекомендаций", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendations();
  }, []);

  const handleLikeToggle = (id: number) => {
    setGamesData((prevGames) =>
      prevGames.map((game) =>
        game.id === id
          ? {
              ...game,
              liked: !game.liked,
              likes: game.liked ? game.likes - 1 : game.likes + 1,
            }
          : game
      )
    );
  };

  if (loading) {
    return <Loader />;
  }

  if (gamesData.length === 0) {
    return null;
  }

  return (
    <section className="bg-white text-black">
      <div className="container">
        <div className="py-5 flex flex-col gap-5">
          <h1 className="text-3xl font-bold">Рекомендуемые игры</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {gamesData.map((game) => (
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
                disableLike={true}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CatalogRecommended;
