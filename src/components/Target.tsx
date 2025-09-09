import { useState } from "react";

interface TargetProps {
  x: number;
  y: number;
  size?: number;
  onHit: () => void;
}

export const Target = ({ x, y, size = 48, onHit }: TargetProps) => {
  const [isHit, setIsHit] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsHit(true);
    onHit();
  };

  return (
    <div
      className={`absolute rounded-full cursor-pointer transform -translate-x-1/2 -translate-y-1/2 transition-all duration-200 ${
        isHit
          ? "bg-game-success animate-target-hit"
          : "bg-game-target animate-target-appear hover:scale-110"
      }`}
      style={{ 
        left: x, 
        top: y, 
        width: size, 
        height: size 
      }}
      onClick={handleClick}
    >
      <div className="absolute inset-2 rounded-full border-2 border-white/30" />
      <div className="absolute inset-4 rounded-full bg-white/20" />
      {!isHit && (
        <div className="absolute inset-0 rounded-full animate-pulse-glow" />
      )}
    </div>
  );
};