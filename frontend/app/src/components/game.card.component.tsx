import { Heart } from "lucide-react";
import React, { FC } from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  id: number;
  title: string;
  description: string;
  category: string[];
  price: number;
  discount: number;
  views: number;
  imageSrc: string;
  likes: number;
  liked: boolean;
  disableLike?: boolean;
  // eslint-disable-next-line no-unused-vars
  onLikeToggle: (id: number) => void;
}

const GameCard: FC<Props> = ({
  id,
  title,
  description,
  category,
  price,
  discount,
  views,
  imageSrc,
  likes,
  liked,
  disableLike = false,
  onLikeToggle,
}) => {
  const navigate = useNavigate();
  const discountedPrice = price - price * (discount / 100);

  const handleLike = (e: React.MouseEvent) => {
    if (disableLike) return;
    e.stopPropagation();
    onLikeToggle(id);
  };

  const handleCardClick = () => {
    navigate(`/games/${id}`);
  };

  return (
    <div
      onClick={handleCardClick}
      className="bg-white rounded-lg overflow-hidden shadow-md 
                 transform transition-all duration-300 cursor-pointer
                 hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="relative overflow-hidden">
        <img
          src={imageSrc}
          alt={title}
          className="w-full h-48 object-cover transition-transform duration-300
                       group-hover:scale-110"
        />
        {discount > 0 && (
          <div className="absolute top-3 right-3 bg-red-500 text-white px-2 py-1 rounded-md">
            -{discount}%
          </div>
        )}
      </div>

      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-semibold group-hover:text-blue-600 transition-colors duration-300">
            {title}
          </h3>
          <button
            onClick={handleLike}
            disabled={disableLike}
            className={`flex items-center gap-1 group p-1 ${
              disableLike
                ? "cursor-not-allowed opacity-50"
                : "hover:bg-gray-100"
            } rounded-full`}
          >
            <Heart
              size={24}
              className={`transform transition-all duration-300 ${
                liked
                  ? "text-red-500 fill-red-500 scale-110"
                  : "text-gray-400 hover:scale-110"
              }`}
            />
            <span
              className={`text-sm ${liked ? "text-red-500" : "text-gray-400"}`}
            >
              {likes}
            </span>
          </button>
        </div>

        <span className="inline-block bg-gray-100 text-gray-600 text-sm px-2 py-1 rounded-md mb-2">
          {category.join(", ")}
        </span>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{description}</p>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {discount > 0 ? (
              <>
                <span className="text-gray-400 line-through">${price}</span>
                <span className="text-xl font-bold text-green-600">
                  ${discountedPrice.toFixed(2)}
                </span>
              </>
            ) : (
              <span className="text-xl font-bold">${price}</span>
            )}
          </div>

          <div className="flex items-center gap-1 text-gray-500 text-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
            {views}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameCard;
