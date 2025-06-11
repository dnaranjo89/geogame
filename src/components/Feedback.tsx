import React from "react";

interface FeedbackProps {
  distance: number | null;
  threshold: number;
  attempts: number;
}

const Feedback: React.FC<FeedbackProps> = ({
  distance,
  threshold,
  attempts,
}) => {
  if (distance === null) return null;
  if (distance <= threshold) {
    return (
      <div
        style={{
          color: "green",
          margin: "12px 0",
          background: "rgba(255,255,255,0.95)",
          borderRadius: 8,
          padding: "10px 18px",
          fontWeight: 600,
          boxShadow: "0 2px 8px rgba(0,0,0,0.10)",
          display: "inline-block",
        }}
      >
        ¡Correcto! Estuviste a solo {distance.toFixed(2)} km. Intentos:{" "}
        {attempts}
      </div>
    );
  }
  let message = "¡Intenta de nuevo!";
  if (distance > 1000) message = "¡Muy lejos!";
  else if (distance > 200) message = "Lejos!";
  else if (distance > 50) message = "¡Más cerca!";
  else message = "¡Muy cerca!";
  return (
    <div
      style={{
        color: "red",
        margin: "12px 0",
        background: "rgba(255,255,255,0.95)",
        borderRadius: 8,
        padding: "10px 18px",
        fontWeight: 600,
        boxShadow: "0 2px 8px rgba(0,0,0,0.10)",
        display: "inline-block",
      }}
    >
      {message} Estuviste a {distance.toFixed(2)} km.
    </div>
  );
};

export default Feedback;
