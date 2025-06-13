import React, { useState } from "react";

interface ImageDisplayProps {
  src: string;
  alt: string;
  onClick?: () => void;
}

const ImageDisplay: React.FC<ImageDisplayProps> = ({ src, alt, onClick }) => {
  const [expanded, setExpanded] = useState(false);
  // Use a media query to detect mobile
  const isMobile =
    typeof window !== "undefined" &&
    window.matchMedia("(max-width: 602px)").matches;
  // Only use expanded for mobile
  // The parent now controls the container size

  return (
    <div style={{ textAlign: "center", marginBottom: 16 }}>
      <img
        src={src}
        alt={alt}
        style={{
          width: "100%",
          height: "auto",
          maxWidth: "100%",
          maxHeight: 480,
          borderRadius: 8,
          transition: "width 0.3s, max-width 0.3s, max-height 0.3s",
          cursor: isMobile ? "pointer" : undefined,
          boxShadow: expanded ? "0 4px 16px rgba(0,0,0,0.18)" : undefined,
          display: "block",
          margin: "0 auto",
        }}
        onClick={() => {
          if (isMobile) {
            setExpanded((e) => !e);
            if (onClick) onClick();
          }
        }}
      />
    </div>
  );
};

export default ImageDisplay;
