export interface IGameDetails {
  id: number;
  title: string;
  description: string;
  longDescription: string;
  category: string[];
  platform: string[];
  price: number;
  discount: number;
  views: number;
  imageSrc: string;
  developer: string;
  publisher: string;
  releaseDate: string;
  features: string[];
  quantity: number;
  likes: number;
  liked: boolean;
}
