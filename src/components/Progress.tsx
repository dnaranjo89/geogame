import React from "react";

interface ProgressProps {
  current: number;
  total: number;
}

const Progress: React.FC<ProgressProps> = ({ current, total }) => (
  <div style={{ margin: "12px 0", fontWeight: 500 }}>
    Image {current + 1} of {total}
  </div>
);

export default Progress;
