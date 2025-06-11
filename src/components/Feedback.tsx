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
      <div style={{ color: "green", margin: "12px 0" }}>
        Correct! You were only {distance.toFixed(2)} km away. Attempts:{" "}
        {attempts}
      </div>
    );
  }
  let message = "Try again!";
  if (distance > 1000) message = "Very far!";
  else if (distance > 200) message = "Far!";
  else if (distance > 50) message = "Getting closer!";
  else message = "Very close!";
  return (
    <div style={{ color: "red", margin: "12px 0" }}>
      {message} You were {distance.toFixed(2)} km away.
    </div>
  );
};

export default Feedback;
