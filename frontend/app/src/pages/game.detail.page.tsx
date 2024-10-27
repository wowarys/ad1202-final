import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Heart } from "lucide-react";
import { gamesData } from "../model/data/games-data";

interface Game {
  id: string;
  title: string;
  description: string;
  category: string[];
  price: number;
  discount: number;
  views: number;
  likes: number;
  quantity: number;
  imageSrc: string;
  releaseDate: string;
  developer: string;
  publisher: string;
  platform: string[];
  features: string[];
  longDescription: string;
}

const GameDetail = () => {
  const { id } = useParams();
  const [game, setGame] = useState<Game | null>(null);
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(0);

  useEffect(() => {
    const gameData = gamesData.find(
      (g: { id: string | undefined }) => g.id === id
    );
    if (gameData) {
      setGame(gameData);
      setLikes(gameData.likes);
    }
  }, [id]);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes((prev) => (isLiked ? prev - 1 : prev + 1));
  };

  if (!game) {
    return (
      <div className="container !px-4 !py-8 text-center">
        <p>Игра не найдена</p>
      </div>
    );
  }

  const discountedPrice = game.price - game.price * (game.discount / 100);

  return (
    <div className="container !px-4 !py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <div className="relative">
            <img
              src={game.imageSrc}
              alt={game.title}
              className="w-full rounded-lg shadow-lg"
            />
            {game.discount > 0 && (
              <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-md">
                -{game.discount}%
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-start">
            <h1 className="text-4xl font-bold">{game.title}</h1>
            <button
              onClick={handleLike}
              className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <Heart
                size={28}
                className={`transform transition-all duration-300 ${
                  isLiked
                    ? "text-red-500 fill-red-500 scale-110"
                    : "text-gray-400 hover:scale-110"
                }`}
              />
              <span
                className={`text-lg ${isLiked ? "text-red-500" : "text-gray-400"}`}
              >
                {likes}
              </span>
            </button>
          </div>

          <div className="flex gap-2">
            {game.platform.map((platform) => (
              <span
                key={platform}
                className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
              >
                {platform}
              </span>
            ))}
          </div>

          <div className="mt-2">
            <p className="text-gray-600">{game.longDescription}</p>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-4">
            <div>
              <h3 className="text-lg font-semibold">Стоимость (со скидкой)</h3>
              <p className="text-gray-600">${discountedPrice.toFixed(2)}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Кол-во товара</h3>
              <p className="text-gray-600">{game.quantity}</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mt-4">
            <div>
              <h3 className="text-lg font-semibold">Разработчик</h3>
              <p className="text-gray-600">{game.developer}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Издатель</h3>
              <p className="text-gray-600">{game.publisher}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Дата выхода</h3>
              <p className="text-gray-600">{game.releaseDate}</p>
            </div>
          </div>

          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2">Жанры</h3>
            <div className="flex flex-wrap gap-2">
              {game.category.map((category) => (
                <span
                  key={category}
                  className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
                >
                  {category}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2">Особенности</h3>
            <div className="flex flex-wrap gap-2">
              {game.features.map((feature) => (
                <span
                  key={feature}
                  className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
                >
                  {feature}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameDetail;
