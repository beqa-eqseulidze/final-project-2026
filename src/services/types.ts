export interface SlideData {
  id: number;
  image: string;
  logo: string;
  title: string;
  desc: string;
  oldPrice: string;
  newPrice: string;
}

export interface SliderProps {
  slides: SlideData[];
}