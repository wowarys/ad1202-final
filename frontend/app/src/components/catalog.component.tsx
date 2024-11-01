import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";
import React, { useEffect, useState } from "react";
import GameCard from "./game.card.component";
import { GetAllProducts, getAllLikes, likeProduct } from "../api/api";
import { IGameDetails } from "../model/types/games";
import Loader from "./loader.component";
import { toast } from "../hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const Catalog = () => {
  const [loading, setLoading] = useState(true);
  const [gamesData, setGamesData] = useState<IGameDetails[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isMobile, setIsMobile] = useState(false);

  // Определение категорий
  const categories = [
    { value: "all", label: "Все игры" },
    { value: "action", label: "Экшен" },
    { value: "rpg", label: "РПГ" },
    { value: "adventure", label: "Приключения" },
    { value: "openworld", label: "Открытый мир" },
    { value: "shooter", label: "Шутер" },
    { value: "horror", label: "Хоррор" },
    { value: "mystic", label: "Мистика" },
    { value: "hardcore", label: "Хардкор" },
    { value: "stealth", label: "Стелс" },
    { value: "strategy", label: "Стратегия" },
  ];

  // Определяем ширину экрана
  useEffect(() => {
    const checkWidth = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkWidth();
    window.addEventListener("resize", checkWidth);
    return () => window.removeEventListener("resize", checkWidth);
  }, []);

  useEffect(() => {
    const fetchDataAndLikes = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const data = await GetAllProducts();

        if (token) {
          const likes = await getAllLikes();
          const likeMap = new Map(
            likes.map((like: any) => [like.product_id.toString(), like.liked])
          );

          const gamesWithLikes = data.map((game: IGameDetails) => ({
            ...game,
            liked: likeMap.get(game.id.toString()) || false,
          }));

          setGamesData(gamesWithLikes);
        } else {
          const gamesWithoutLikes = data.map((game: IGameDetails) => ({
            ...game,
            liked: false,
          }));
          setGamesData(gamesWithoutLikes);
        }
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
    const token = localStorage.getItem("accessToken");
    if (!token) {
      toast({
        title: "Требуется авторизация",
        description: "Для того чтобы поставить лайк, необходимо авторизоваться",
        variant: "destructive",
      });
      return;
    }

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

  const filterGames = (category: string) => {
    if (category === "all") return gamesData;
    const categoryMap: { [key: string]: string } = {
      action: "Экшен",
      rpg: "RPG",
      adventure: "Приключения",
      openworld: "Открытый мир",
      shooter: "Шутер",
      horror: "Хоррор",
      mystic: "Мистика",
      hardcore: "Хардкор",
      stealth: "Стелс",
      strategy: "Стратегия",
    };
    return gamesData.filter((game) =>
      game.category.includes(categoryMap[category])
    );
  };

  return (
    <section className="bg-white text-black">
      <div className="container">
        <div className="py-5 flex flex-col gap-5">
          <h1 className="text-3xl font-bold">Популярные игры</h1>

          {isMobile ? (
            <div className="w-full">
              <Select
                value={selectedCategory}
                onValueChange={setSelectedCategory}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Выберите категорию" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="grid grid-cols-1 gap-6 mt-6">
                {filterGames(selectedCategory).map(renderGameCard)}
              </div>
            </div>
          ) : (
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <TabsTrigger key={category.value} value={category.value}>
                    {category.label}
                  </TabsTrigger>
                ))}
              </TabsList>
              {categories.map((category) => (
                <TabsContent key={category.value} value={category.value}>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                    {filterGames(category.value).map(renderGameCard)}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          )}
        </div>
      </div>
    </section>
  );
};

export default Catalog;
