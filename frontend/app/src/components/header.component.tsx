import React from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { LogIn, PlusCircle } from "lucide-react";

const Header = () => {
  return (
    <header className="flex flex-row items-center justify-between gap-10">
      <div className="logo">
        <img
          src="../../img/logo.webp"
          alt="logo"
          className="h-auto w-full min-w-[125px] max-w-[125px] object-contain cursor-pointer"
        />
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
