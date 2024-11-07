import React, { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { LogIn, Menu, UserPlus } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "../ui/dropdown";
import { Sheet, SheetTrigger, SheetContent } from "../ui/sheet";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { getInitials } from "../lib/utils";
import { fetchUserProfile, searchProducts } from "../api/api";
import { IGameDetails } from "../model/types/games";

const Header = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profile, setProfile] = useState({
    name: "",
    username: "",
    age: 0,
    bio: "",
    user_id: "",
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<IGameDetails[]>([]);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      setIsLoggedIn(true);
      fetchUserProfile(token)
        .then((profileData) => {
          setProfile(profileData);
        })
        .catch((error) => {
          console.error("Error fetching user profile", error);
          localStorage.removeItem("accessToken");
          setIsLoggedIn(false);
          navigate("/sign/in");
        });
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    setIsLoggedIn(false);
    setProfile({
      name: "",
      username: "",
      age: 0,
      bio: "",
      user_id: "",
    });
    navigate("/sign/in");
  };

  const handleLogin = () => {
    navigate("/sign/in");
  };

  const handleRegister = () => {
    navigate("/sign/up");
  };

  const handleProfile = () => {
    navigate("/profile");
  };

  const handleHistory = () => {
    navigate("/profile/history");
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSearchChange = async (event: { target: { value: any } }) => {
    const query = event.target.value;
    setSearchQuery(query);
    if (query.length > 2) {
      try {
        const results = await searchProducts(query);
        setSearchResults(results);
      } catch (error) {
        console.error("Error searching products", error);
      }
    } else {
      setSearchResults([]);
    }
  };

  const handleSearchSelect = (games: IGameDetails) => {
    navigate(`/games/${games.id}`);
    setSearchQuery("");
    setSearchResults([]);
  };

  const calculateDiscountedPrice = (price: number, discount: number) => {
    return price - (price * discount) / 100;
  };

  const displayName = profile.name || profile.username;

  return (
    <header className="container flex flex-row items-center justify-between gap-10 !py-4 bg-white max-md:gap-4">
      <div className="logo">
        <Link to="/">
          <img
            src="../../img/logo.webp"
            alt="logo"
            className="h-auto w-full min-w-[125px] max-w-[125px] object-contain cursor-pointer max-md:max-w-[80px] max-md:min-w-[80px]"
          />
        </Link>
      </div>
      <div className="relative flex-grow">
        <Input
          isSearchIcon={true}
          placeholder="Поиск по играм"
          value={searchQuery}
          onChange={handleSearchChange}
          className="w-full"
        />
        {searchResults.length > 0 && (
          <div className="absolute z-10 bg-white border border-gray-300 rounded-md mt-1 w-full">
            {searchResults.map((product) => (
              <div
                key={product.id}
                className="p-2 cursor-pointer hover:bg-gray-100 flex items-center"
                onClick={() => handleSearchSelect(product)}
              >
                <img
                  src={product.imageSrc}
                  alt={product.title}
                  className="w-10 h-10 mr-2"
                />
                <div>
                  <p>{product.title}</p>
                  <p>
                    {calculateDiscountedPrice(
                      product.price,
                      product.discount
                    ).toFixed(2)}{" "}
                    $
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="flex flex-row gap-4 items-center max-md:hidden">
        {!isLoggedIn ? (
          <>
            <Button
              type="button"
              variant="outline"
              onClick={handleLogin}
              className="flex items-center gap-2 hover:bg-gray-50 transition-colors duration-200"
            >
              <LogIn className="w-4 h-4" />
              <span>Войти</span>
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={handleRegister}
              className="flex items-center gap-2 hover:bg-gray-50 transition-colors duration-200"
            >
              <UserPlus className="w-4 h-4" />
              <span>Регистрация</span>
            </Button>
          </>
        ) : (
          <div className="relative">
            <DropdownMenu modal={false}>
              <DropdownMenuTrigger asChild>
                <Avatar className="cursor-pointer inline-flex h-12 w-12 select-none items-center justify-center overflow-hidden rounded-full align-middle">
                  <AvatarFallback className="flex h-full w-full items-center justify-center rounded-full bg-gradient-to-br from-purple-600 to-blue-500 font-medium text-base text-white">
                    {getInitials(displayName ? displayName : profile.user_id)}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56">
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1 gap-1">
                    <p className="text-sm text-gray-500">Имя пользователя</p>
                    <p className="text-sm font-medium leading-none">
                      {displayName ? displayName : profile.user_id}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-gray-200" />
                <DropdownMenuItem
                  onClick={handleProfile}
                  className="cursor-pointer"
                >
                  Профиль
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={handleHistory}
                  className="cursor-pointer"
                >
                  Мои покупки
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-gray-200" />
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="cursor-pointer text-red-600"
                >
                  Выйти
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
      </div>
      <Sheet>
        <SheetTrigger>
          <Menu
            className="cursor-pointer min-w-[42px] min-h-[42px] md:hidden"
            size={42}
          />
        </SheetTrigger>
        <SheetContent className="w-[400px] max-md:!w-[240px] items-center justify-center flex">
          <div className="flex flex-col gap-4 items-center">
            {!isLoggedIn ? (
              <>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleLogin}
                  className="flex items-center gap-2 hover:bg-gray-50 transition-colors duration-200 w-full"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Войти</span>
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleRegister}
                  className="flex items-center gap-2 hover:bg-gray-50 transition-colors duration-200 w-full"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>Регистрация</span>
                </Button>
              </>
            ) : (
              <div className="relative">
                <DropdownMenu modal={false}>
                  <DropdownMenuTrigger asChild>
                    <Avatar className="cursor-pointer inline-flex h-12 w-12 select-none items-center justify-center overflow-hidden rounded-full align-middle">
                      <AvatarFallback className="flex h-full w-full items-center justify-center rounded-full bg-gradient-to-br from-purple-600 to-blue-500 font-medium text-base text-white">
                        {getInitials(
                          displayName ? displayName : profile.user_id
                        )}
                      </AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="center" className="w-56">
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1 gap-1">
                        <p className="text-sm text-gray-500">
                          Имя пользователя
                        </p>
                        <p className="text-sm font-medium leading-none">
                          {displayName ? displayName : profile.user_id}
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator className="bg-gray-200" />
                    <DropdownMenuItem
                      onClick={handleProfile}
                      className="cursor-pointer"
                    >
                      Профиль
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={handleHistory}
                      className="cursor-pointer"
                    >
                      Мои покупки
                    </DropdownMenuItem>
                    <DropdownMenuSeparator className="bg-gray-200" />
                    <DropdownMenuItem
                      onClick={handleLogout}
                      className="cursor-pointer text-red-600"
                    >
                      Выйти
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
};

export default Header;
