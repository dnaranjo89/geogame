import React from "react";

interface ImageDisplayProps {
  src: string;
  alt: string;
}

const ImageDisplay: React.FC<ImageDisplayProps> = ({ src, alt }) => (
  <div style={{ textAlign: "center", marginBottom: 16 }}>
    <img
      src={src}
      alt={alt}
      style={{ maxWidth: "100%", maxHeight: 300, borderRadius: 8 }}
    />
  </div>
);

export default ImageDisplay;
