import React, { useState } from "react";
import { imageData } from "./assets/images";
import { calculateDistance } from "./utils/distance";
import { useLocalStorage } from "./hooks/useLocalStorage";
import ImageDisplay from "./components/ImageDisplay";
import MapGuess from "./components/MapGuess";
import Feedback from "./components/Feedback";
import Progress from "./components/Progress";
import NextButton from "./components/NextButton";
import type { Progress as ProgressType } from "./types";
import "./App.css";

const DISTANCE_THRESHOLD = 25; // km

const getInitialProgress = () => ({
  currentImage: 0,
  guesses: [],
  completed: false,
});

const App: React.FC = () => {
  const [progress, setProgress] = useLocalStorage<ProgressType>(
    "geo-progress",
    getInitialProgress()
  );
  const [guess, setGuess] = useState<{ lat: number; lng: number } | null>(null);
  const [distance, setDistance] = useState<number | null>(null);
  const [attempts, setAttempts] = useState(0);
  const current = imageData[progress.currentImage];

  const handleMapGuess = (coords: { lat: number; lng: number }) => {
    setGuess(coords);
  };

  const handleSubmit = () => {
    if (!guess) return;
    const d = calculateDistance(
      guess.lat,
      guess.lng,
      current.location.lat,
      current.location.lng
    );
    setDistance(d);
    setAttempts((a) => a + 1);
    setProgress((prev: ProgressType) => ({
      ...prev,
      guesses: [...prev.guesses, { ...guess, distance: d }],
    }));
  };

  const handleNext = () => {
    if (progress.currentImage < imageData.length - 1) {
      setProgress((prev: ProgressType) => ({
        ...prev,
        currentImage: prev.currentImage + 1,
        guesses: [],
      }));
      setGuess(null);
      setDistance(null);
      setAttempts(0);
    } else {
      setProgress((prev: ProgressType) => ({ ...prev, completed: true }));
    }
  };

  React.useEffect(() => {
    setGuess(null);
    setDistance(null);
    setAttempts(0);
  }, [progress.currentImage]);

  if (progress.completed) {
    return (
      <div style={{ textAlign: "center", marginTop: 40 }}>
        <h2>Congratulations! You finished the game.</h2>
      </div>
    );
  }

  return (
    <div style={{ margin: "0 auto", padding: 24 }}>
      <Progress current={progress.currentImage} total={imageData.length} />
      <ImageDisplay src={current.src} alt={current.alt} />
      <MapGuess
        guess={guess}
        setGuess={handleMapGuess}
        disabled={distance !== null && distance <= DISTANCE_THRESHOLD}
      />
      <div style={{ margin: "16px 0" }}>
        <button
          onClick={handleSubmit}
          disabled={
            !guess || (distance !== null && distance <= DISTANCE_THRESHOLD)
          }
          style={{ padding: "8px 20px", fontSize: 16 }}
        >
          Submit Guess
        </button>
      </div>
      <Feedback
        distance={distance}
        threshold={DISTANCE_THRESHOLD}
        attempts={attempts}
      />
      <NextButton
        onClick={handleNext}
        show={distance !== null && distance <= DISTANCE_THRESHOLD}
      />
    </div>
  );
};

export default App;
