import React from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="bg-[#1d1f22] text-white">
      <div className="container flex flex-row gap-10 justify-between items-center">
        <div className="py-6 w-full cursor-pointer max-md:hidden">
          <Link to="https://store.steampowered.com/">
            <img
              src="../../img/hero.webp"
              alt="hero"
              className="h-auto rounded-lg w-full transition-transform duration-700 ease-in-out transform hover:scale-105 hover:shadow-lg"
            />
          </Link>
        </div>
        <div className="py-6 w-full flex flex-col gap-2 max-md:text-center">
          <h1 className="text-4xl font-bold">SteamShop</h1>
          <p className="text-lg">
            Добро пожаловать в <strong>SteamShop</strong> — ваш надежный
            источник для покупки цифровых игр и аксессуаров. Мы предлагаем
            широкий выбор новейших игр, эксклюзивных скидок и товаров для всех
            платформ.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
