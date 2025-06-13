import React, { useState } from "react";
import ImageDisplay from "./ImageDisplay";
import Progress from "./Progress";

interface ImageAndProgressProps {
  src: string;
  alt: string;
  progressCurrent: number;
  progressTotal: number;
  currentThreshold: number;
  debug?: boolean;
  debugId?: number;
}

const ImageAndProgress: React.FC<ImageAndProgressProps> = ({
  src,
  alt,
  progressCurrent,
  progressTotal,
  currentThreshold,
  debug = false,
  debugId,
}) => {
  const [expanded, setExpanded] = useState(false);
  // Detect mobile
  const isMobile =
    typeof window !== "undefined" &&
    window.matchMedia("(max-width: 90vw)").matches;
  // Responsive width logic
  let containerWidth = isMobile
    ? "clamp(100px, 33vw, 180px)"
    : "clamp(220px, 90vw, 520px)";
  if (isMobile && expanded) {
    containerWidth = "min(98vw, 600px)";
  }
  return (
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
        maxWidth: 600,
        width: containerWidth,
        minWidth: 180,
        transition: "width 0.3s, max-width 0.3s",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <ImageDisplay
          src={src}
          alt={alt}
          onClick={isMobile ? () => setExpanded((e) => !e) : undefined}
        />
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          flexWrap: "wrap",
          rowGap: 4,
        }}
      >
        <Progress current={progressCurrent} total={progressTotal} />
        <span
          style={{
            fontSize: 15,
            color: "#1a7f1a",
            fontWeight: 500,
            marginLeft: 2,
            background: "#eafbe6",
            borderRadius: 6,
            padding: "2px 8px",
            boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
            whiteSpace: "nowrap",
          }}
        >
          (±{currentThreshold} km)
        </span>
        {debug && debugId !== undefined && (
          <span style={{ fontSize: 14, color: "#888", fontWeight: 500 }}>
            ID: {debugId}
          </span>
        )}
      </div>
    </div>
  );
};

export default ImageAndProgress;
