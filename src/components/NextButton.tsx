import React from "react";

interface NextButtonProps {
  onClick: () => void;
  disabled?: boolean;
  show: boolean;
}

const NextButton: React.FC<NextButtonProps> = ({ onClick, disabled, show }) => {
  if (!show) return null;
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{ margin: "16px 0", padding: "8px 20px", fontSize: 16 }}
    >
      Next Image
    </button>
  );
};

export default NextButton;
