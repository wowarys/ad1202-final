export interface IGameDetails {
  id: number | string;
  title: string;
  description: string;
  category: string[];
  price: number;
  discount: number;
  views: number;
  quantity: number;
  likes: number;
  imageSrc: string;
  releaseDate: Date | string;
  developer: string;
  publisher: string;
  platform: string[];
  features: string[];
  longDescription: string;
}
