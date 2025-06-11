import React, { useState } from "react";

interface ImageDisplayProps {
  src: string;
  alt: string;
}

const ImageDisplay: React.FC<ImageDisplayProps> = ({ src, alt }) => {
  const [expanded, setExpanded] = useState(false);
  // Use a media query to detect mobile
  const isMobile =
    typeof window !== "undefined" && window.matchMedia("(max-width: 600px)").matches;
  const smallSize = isMobile ? 90 : 180;
  const largeSize = isMobile ? 220 : 300;
  const size = expanded ? largeSize : smallSize;

  return (
    <div style={{ textAlign: "center", marginBottom: 16 }}>
      <img
        src={src}
        alt={alt}
        style={{
          maxWidth: size,
          maxHeight: size,
          borderRadius: 8,
          transition: "max-width 0.3s, max-height 0.3s",
          cursor: isMobile ? "pointer" : undefined,
          boxShadow: expanded ? "0 4px 16px rgba(0,0,0,0.18)" : undefined,
        }}
        onClick={() => {
          if (isMobile) setExpanded((e) => !e);
        }}
      />
    </div>
  );
};

export default ImageDisplay;
