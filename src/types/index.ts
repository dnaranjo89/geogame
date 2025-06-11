export interface ImageData {
  id: number;
  src: string;
  alt: string;
  location: { lat: number; lng: number };
}

export interface Guess {
  lat: number;
  lng: number;
  distance: number;
}

export interface Progress {
  currentImage: number;
  guesses: Guess[];
  completed: boolean;
}
