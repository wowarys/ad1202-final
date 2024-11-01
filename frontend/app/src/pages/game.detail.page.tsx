import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Heart, Loader2 } from "lucide-react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { IGameDetails } from "../model/types/games";
import {
  GetProductById,
  getAllLikes,
  likeProduct,
  purchaseProductById,
} from "../api/api";

const GameDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [game, setGame] = useState<IGameDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState("1");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    const fetchGameAndLikes = async () => {
      try {
        setLoading(true);
        const gameData = await GetProductById(Number(id));
        const token = localStorage.getItem("accessToken");

        if (token) {
          const likes = await getAllLikes();
          const gameLike = likes.find(
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (like: any) => like.product_id.toString() === id?.toString()
          );
          setGame({
            ...gameData,
            liked: gameLike ? gameLike.liked : false,
          });
        } else {
          setGame({
            ...gameData,
            liked: false,
          });
        }
      } catch (error) {
        console.error("Ошибка при получении данных игры", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchGameAndLikes();
    }
  }, [id]);

  const handleLike = async () => {
    try {
      const response = await likeProduct(Number(id));
      setGame((prevGame) =>
        prevGame
          ? { ...prevGame, likes: response.likes, liked: response.liked }
          : null
      );
    } catch (error) {
      console.error("Ошибка при переключении лайка:", error);
    }
  };

  const handlePurchase = async () => {
    try {
      await purchaseProductById(Number(id), Number(quantity));
      setIsDialogOpen(false);
    } catch (error) {
      console.error("Error purchasing game:", error);
    }
  };

  if (loading) {
    return (
      <div className="container max-w-4xl !py-8 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (!game) {
    return (
      <div className="container">
        <div className="flex flex-col gap-10 justify-center items-center py-8">
          <img src="../../img/404.webp" alt="404" className="w-1/2 h-auto" />
          <h2 className="text-4xl font-semibold text-gray-800">
            Игра не найдена
          </h2>
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              navigate("/");
            }}
          >
            Вернуться на главную
          </Button>
        </div>
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
                  game.liked
                    ? "text-red-500 fill-red-500 scale-110"
                    : "text-gray-400 hover:scale-110"
                }`}
              />
              <span
                className={`text-lg ${
                  game.liked ? "text-red-500" : "text-gray-400"
                }`}
              >
                {game.likes}
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

          <div className="mt-8 flex gap-4 items-center">
            <Select value={quantity} onValueChange={setQuantity}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Количество" />
              </SelectTrigger>
              <SelectContent>
                {[...Array(Math.min(10, game?.quantity || 0))].map((_, i) => (
                  <SelectItem key={i + 1} value={(i + 1).toString()}>
                    {i + 1}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              onClick={() => setIsDialogOpen(true)}
              disabled={!game?.quantity}
              className="flex-1"
            >
              Купить сейчас
            </Button>
          </div>
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Подтверждение покупки</DialogTitle>
            <DialogDescription>
              Вы уверены, что хотите приобрести {game?.title} ({quantity} шт.)
              за $
              {(
                ((game?.price || 0) -
                  (game?.price || 0) * ((game?.discount || 0) / 100)) *
                Number(quantity)
              ).toFixed(2)}
              ?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Отмена
            </Button>
            <Button onClick={handlePurchase}>Подтвердить покупку</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default GameDetail;
