import React from "react";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();
  return (
    <div className="container">
      <div className="flex flex-col gap-10 justify-center items-center py-8">
        <img src="../../img/404.webp" alt="404" className="w-1/2 h-auto" />
        <h2 className="text-4xl font-semibold text-gray-800">
          Страница не найдена
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
};

export default NotFoundPage;
