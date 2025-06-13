import React, { useState } from "react";

interface ImageDisplayProps {
  src: string;
  alt: string;
}

const ImageDisplay: React.FC<ImageDisplayProps> = ({ src, alt }) => {
  const [expanded, setExpanded] = useState(false);
  // Use a media query to detect mobile
  const isMobile =
    typeof window !== "undefined" &&
    window.matchMedia("(max-width: 600px)").matches;
  // Make image bigger on desktop
  const smallSize = isMobile ? 90 : 500;
  const largeSize = isMobile ? 220 : 700; // large but not excessive
  const size = expanded ? largeSize : smallSize;

  console.log("isMobile", isMobile);

  return (
    <div style={{ textAlign: "center", marginBottom: 16 }}>
      <img
        src={src}
        alt={alt}
        style={{
          width: size, // force width
          height: "auto",
          maxWidth: "100%",
          borderRadius: 8,
          transition: "width 0.3s, max-width 0.3s, max-height 0.3s",
          cursor: isMobile ? "pointer" : undefined,
          boxShadow: expanded ? "0 4px 16px rgba(0,0,0,0.18)" : undefined,
          display: "block",
          margin: "0 auto",
        }}
        onClick={() => {
          if (isMobile) setExpanded((e) => !e);
        }}
      />
    </div>
  );
};

export default ImageDisplay;
