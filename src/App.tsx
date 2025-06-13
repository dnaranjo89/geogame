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

const DISTANCE_THRESHOLD = 0.1; // km
const DEBUG = true; // Set to false to hide the actual location marker
// Premio total y por imagen
const POOL_TOTAL = 1000; // euros
const PRIZE_PER_PHOTO = Math.floor(POOL_TOTAL / imageData.length);

const getInitialProgress = () => ({
  currentImage: 0,
  guesses: [],
  completed: false,
  failed: [], // array of failed photo ids
});

const App: React.FC = () => {
  const [progress, setProgress] = useLocalStorage<
    ProgressType & { failed: number[] }
  >("geo-progress", getInitialProgress());
  const [guess, setGuess] = useState<{ lat: number; lng: number } | null>(null);
  const [distance, setDistance] = useState<number | null>(null);
  const [attempts, setAttempts] = useState(0);
  const [actualLocation, setActualLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const current = imageData[progress.currentImage];
  const currentThreshold =
    typeof current.threshold === "number"
      ? current.threshold
      : DISTANCE_THRESHOLD;
  console.log("Current loc:", actualLocation);

  const isCurrentFailed =
    Array.isArray(progress.failed) && progress.failed.includes(current.id);

  const handleMapGuess = (coords: { lat: number; lng: number }) => {
    setGuess(coords);
  };
  console.log("distance", distance);

  const handleSubmit = async () => {
    if (!guess || isCurrentFailed) return;
    let loc = null;
    // Usa location de imageData si existe
    if (current.location) {
      loc = current.location;
    } else if (current.src) {
      try {
        const metaLoc = await getLocationFromImage(current.src);
        if (metaLoc) {
          loc = metaLoc;
        }
      } catch {}
    }
    if (!loc) return; // No location found, do not proceed
    setActualLocation(loc); // Save for debug marker
    const d = calculateDistance(guess.lat, guess.lng, loc.lat, loc.lng);
    setDistance(d);
    setAttempts((a) => a + 1);
    setProgress((prev) => {
      const newGuesses = [...prev.guesses, { ...guess, distance: d }];
      let failed = prev.failed || [];
      // Si llega a 3 intentos y no acertó, marcar como fallida
      if (
        newGuesses.length >= 3 &&
        !newGuesses.some((g) => g.distance <= currentThreshold) &&
        !failed.includes(current.id)
      ) {
        failed = [...failed, current.id];
      }
      return {
        ...prev,
        guesses: newGuesses,
        failed,
      };
    });
  };

  const handleNext = () => {
    if (progress.currentImage < imageData.length - 1) {
      setProgress((prev) => ({
        ...prev,
        currentImage: prev.currentImage + 1,
        guesses: [],
        failed: prev.failed || [],
      }));
      setGuess(null);
      setDistance(null);
      setAttempts(0);
    } else {
      setProgress((prev) => ({
        ...prev,
        completed: true,
        failed: prev.failed || [],
      }));
    }
  };

  // Set actual location for debug marker on image change
  React.useEffect(() => {
    let ignore = false;
    async function setLoc() {
      let loc = null;
      if (current.location) {
        loc = current.location;
      } else if (current.src) {
        try {
          const metaLoc = await getLocationFromImage(current.src);
          if (metaLoc) {
            loc = metaLoc;
          }
        } catch {}
      }
      if (!ignore && loc) setActualLocation(loc);
    }
    setGuess(null);
    setDistance(null);
    setAttempts(0);
    setLoc();
    return () => {
      ignore = true;
    };
  }, [progress.currentImage, current.location, current.src]);

  // Calcular imágenes acertadas (no fallidas y dentro del umbral)
  const correctCount = imageData.filter((img, idx) => {
    const threshold =
      typeof img.threshold === "number" ? img.threshold : DISTANCE_THRESHOLD;
    if (progress.failed && progress.failed.includes(img.id)) return false;
    if (!progress.guesses || idx > progress.currentImage) return false;
    if (idx === progress.currentImage) {
      return progress.guesses.some((g) => g.distance <= threshold);
    }
    return true;
  }).length;
  const earned = correctCount * PRIZE_PER_PHOTO;

  if (progress.completed) {
    return (
      <div style={{ textAlign: "center", marginTop: 40 }}>
        <h2>¡Felicidades! Has terminado el juego.</h2>
      </div>
    );
  }

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        margin: 0,
        padding: 0,
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 16,
          left: 16,
          zIndex: 1000,
          background: "rgba(255,255,255,0.95)",
          borderRadius: 8,
          boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
          padding: 8,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <ImageDisplay src={current.src} alt={current.alt} />
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <Progress current={progress.currentImage} total={imageData.length} />
          <span
            style={{
              fontSize: 15,
              color: "#1a7f1a",
              fontWeight: 500,
              marginLeft: 2,
            }}
          >
            (±{currentThreshold} km)
          </span>
          {DEBUG && (
            <span style={{ fontSize: 14, color: "#888", fontWeight: 500 }}>
              ID: {current.id}
            </span>
          )}
        </div>
      </div>
      <div style={{ width: "100vw", height: "100vh" }}>
        <MapGuess
          guess={guess}
          setGuess={handleMapGuess}
          disabled={distance !== null && distance <= DISTANCE_THRESHOLD}
          debugLocation={DEBUG ? actualLocation : undefined}
        />
      </div>
      <div
        style={{
          position: "absolute",
          bottom: 32,
          left: 0,
          width: "100vw",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          zIndex: 1001,
        }}
      >
        <div style={{ margin: "16px 0", display: "flex", gap: 16 }}>
          <button
            onClick={handleSubmit}
            disabled={
              !guess ||
              (distance !== null && distance <= DISTANCE_THRESHOLD) ||
              isCurrentFailed
            }
            style={{ padding: "8px 20px", fontSize: 16 }}
          >
            Enviar respuesta
          </button>
          {DEBUG && (
            <button
              onClick={handleNext}
              style={{
                padding: "8px 20px",
                fontSize: 16,
                background: "#e0ffe0",
                color: "#1a7f1a",
                border: "1px solid #1a7f1a",
                borderRadius: 4,
              }}
            >
              Siguiente (Debug)
            </button>
          )}
        </div>
        <div
          style={{
            fontWeight: 600,
            fontSize: 18,
            marginBottom: 8,
            background: "#eafbe6",
            borderRadius: 8,
            padding: "8px 18px",
            color: "#1a7f1a",
            boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
            display: "inline-block",
          }}
        >
          Premio acumulado: <span style={{ color: "#1a7f1a" }}>{earned} €</span>{" "}
          / {POOL_TOTAL} €
        </div>
        <Feedback
          distance={distance}
          threshold={currentThreshold}
          attempts={attempts}
        />
        <NextButton
          onClick={handleNext}
          show={
            (distance !== null && distance <= DISTANCE_THRESHOLD) ||
            isCurrentFailed
          }
        />
      </div>
    </div>
  );
};

export default App;
