import React from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { LogIn, PlusCircle } from "lucide-react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="container flex flex-row items-center justify-between gap-10 !py-4 bg-white">
      <div className="logo">
        <Link to="/">
          <img
            src="../../img/logo.webp"
            alt="logo"
            className="h-auto w-full min-w-[125px] max-w-[125px] object-contain cursor-pointer"
          />
        </Link>
      </div>
      <Input isSearchIcon={true} placeholder="Поиск по играм" />
      <div className="flex flex-row gap-4">
        <Button type="button" variant="outline">
          <LogIn />
          Войти
        </Button>
        <Button type="button" variant="outline">
          <PlusCircle /> Регистрация
        </Button>
      </div>
    </header>
  );
};

export default Header;
