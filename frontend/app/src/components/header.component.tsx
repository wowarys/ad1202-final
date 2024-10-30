import React from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { LogIn, Menu, UserPlus } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { User } from "../model/types/user";
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

const Header = () => {
  const navigate = useNavigate();

  // Example user data
  const user: User = {
    first_name: "Test",
    last_name: "User",
    email: "testuser123@gmail.com",
  };

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  const handleLogin = () => {
    navigate("/sign/in");
  };

  const handleRegister = () => {
    navigate("/sign/up");
  };

  return (
    <header className="container flex flex-row items-center justify-between gap-10 !py-4 bg-white shadow-sm max-md:gap-4">
      <div className="logo">
        <Link to="/">
          <img
            src="../../img/logo.webp"
            alt="logo"
            className="h-auto w-full min-w-[125px] max-w-[125px] object-contain cursor-pointer max-md:max-w-[80px] max-md:min-w-[80px]"
          />
        </Link>
      </div>
      <Input isSearchIcon={true} placeholder="Поиск по играм" />
      <div className="flex flex-row gap-4 items-center max-md:hidden">
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
        <div className="relative">
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              <Avatar className="cursor-pointer inline-flex h-12 w-12 select-none items-center justify-center overflow-hidden rounded-full align-middle">
                <AvatarFallback className="flex h-full w-full items-center justify-center rounded-full bg-gradient-to-br from-purple-600 to-blue-500 font-medium text-base text-white">
                  {getInitials(user.first_name!, user.last_name!)}
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56">
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {user.first_name} {user.last_name}
                  </p>
                  <p className="text-xs leading-none text-gray-500">
                    {user.email}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-gray-200" />
              <DropdownMenuItem className="cursor-pointer">
                Профиль
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer">
                Мои покупки
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-gray-200" />
              <DropdownMenuItem className="cursor-pointer text-red-600">
                Выйти
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
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
            <div className="relative">
              <DropdownMenu modal={false}>
                <DropdownMenuTrigger asChild>
                  <Avatar className="cursor-pointer inline-flex h-12 w-12 select-none items-center justify-center overflow-hidden rounded-full align-middle">
                    <AvatarFallback className="flex h-full w-full items-center justify-center rounded-full bg-gradient-to-br from-purple-600 to-blue-500 font-medium text-base text-white">
                      {getInitials(user.first_name!, user.last_name!)}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="center" className="w-56">
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {user.first_name} {user.last_name}
                      </p>
                      <p className="text-xs leading-none text-gray-500">
                        {user.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-gray-200" />
                  <DropdownMenuItem className="cursor-pointer">
                    Профиль
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer">
                    Мои покупки
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-gray-200" />
                  <DropdownMenuItem className="cursor-pointer text-red-600">
                    Выйти
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
};

export default Header;
