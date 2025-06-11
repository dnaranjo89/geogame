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
import { getLocationFromImage } from "./utils/getLocationFromImage";

const DISTANCE_THRESHOLD = 25; // km
const DEBUG = true; // Set to false to hide the actual location marker

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
  const [actualLocation, setActualLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const current = imageData[progress.currentImage];
  console.log("Current loc:", actualLocation);

  const handleMapGuess = (coords: { lat: number; lng: number }) => {
    setGuess(coords);
  };
  console.log("distance", distance);

  const handleSubmit = async () => {
    if (!guess) return;
    let loc = null;
    // Try to get location from image metadata
    if (current.src) {
      try {
        const metaLoc = await getLocationFromImage(current.src);
        if (metaLoc) {
          loc = metaLoc;
        }
      } catch {}
    }
    // Fallback to hardcoded location if no EXIF found
    if (!loc) {
      loc = current.location;
    }
    setActualLocation(loc); // Save for debug marker
    const d = calculateDistance(guess.lat, guess.lng, loc.lat, loc.lng);
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

  // Set actual location for debug marker on image change
  React.useEffect(() => {
    let ignore = false;
    async function setLoc() {
      let loc = null;
      if (current.src) {
        try {
          const metaLoc = await getLocationFromImage(current.src);
          if (metaLoc) {
            loc = metaLoc;
          }
        } catch {}
      }
      if (!loc) {
        loc = current.location;
      }
      if (!ignore) setActualLocation(loc);
    }
    setGuess(null);
    setDistance(null);
    setAttempts(0);
    setLoc();
    return () => { ignore = true; };
  }, [progress.currentImage]);

  if (progress.completed) {
    return (
      <div style={{ textAlign: "center", marginTop: 40 }}>
        <h2>Congratulations! You finished the game.</h2>
      </div>
    );
  }

  return (
    <div style={{ width: '100vw', height: '100vh', margin: 0, padding: 0, position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: 16, left: 16, zIndex: 1000, background: 'rgba(255,255,255,0.95)', borderRadius: 8, boxShadow: '0 2px 8px rgba(0,0,0,0.12)', padding: 8, maxWidth: 350 }}>
        <ImageDisplay src={current.src} alt={current.alt} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Progress current={progress.currentImage} total={imageData.length} />
          <span style={{ fontSize: 14, color: '#888', fontWeight: 500 }}>
            ID: {current.id}
          </span>
        </div>
      </div>
      <div style={{ width: '100vw', height: '100vh' }}>
        <MapGuess
          guess={guess}
          setGuess={handleMapGuess}
          disabled={distance !== null && distance <= DISTANCE_THRESHOLD}
          debugLocation={DEBUG ? actualLocation : undefined}
        />
      </div>
      <div style={{ position: 'absolute', bottom: 32, left: 0, width: '100vw', display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 1001 }}>
        <div style={{ margin: '16px 0', display: 'flex', gap: 16 }}>
          <button
            onClick={handleSubmit}
            disabled={!guess || (distance !== null && distance <= DISTANCE_THRESHOLD)}
            style={{ padding: '8px 20px', fontSize: 16 }}
          >
            Submit Guess
          </button>
          {DEBUG && (
            <button
              onClick={handleNext}
              style={{ padding: '8px 20px', fontSize: 16, background: '#e0ffe0', color: '#1a7f1a', border: '1px solid #1a7f1a', borderRadius: 4 }}
            >
              Skip (Debug)
            </button>
          )}
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
    </div>
  );
};

export default App;
