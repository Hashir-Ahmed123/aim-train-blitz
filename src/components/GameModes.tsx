import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Target, Zap, Crosshair } from "lucide-react";

export type GameMode = "classic" | "speed" | "precision";

interface GameModesProps {
  selectedMode: GameMode;
  onModeSelect: (mode: GameMode) => void;
  onStartGame: () => void;
}

const gameModes = [
  {
    id: "classic" as const,
    name: "Classic",
    description: "Standard aim training with 30 targets or 30 seconds",
    icon: Target,
    color: "text-primary",
  },
  {
    id: "speed" as const,
    name: "Speed Mode",
    description: "Fast-paced with smaller targets and shorter lifetimes",
    icon: Zap,
    color: "text-yellow-400",
  },
  {
    id: "precision" as const,
    name: "Precision Mode", 
    description: "Tiny targets that require perfect accuracy",
    icon: Crosshair,
    color: "text-red-400",
  },
];

export const GameModes = ({ selectedMode, onModeSelect, onStartGame }: GameModesProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-center mb-6">Select Game Mode</h3>
      
      <div className="grid gap-4">
        {gameModes.map((mode) => {
          const Icon = mode.icon;
          const isSelected = selectedMode === mode.id;
          
          return (
            <Card
              key={mode.id}
              className={`p-4 cursor-pointer transition-all hover:scale-105 ${
                isSelected ? "ring-2 ring-primary bg-card/80" : "hover:bg-card/60"
              }`}
              onClick={() => onModeSelect(mode.id)}
            >
              <div className="flex items-start gap-3">
                <Icon className={`w-6 h-6 mt-1 ${mode.color}`} />
                <div className="flex-1">
                  <h4 className="font-medium mb-1">{mode.name}</h4>
                  <p className="text-sm text-muted-foreground">{mode.description}</p>
                </div>
                {isSelected && (
                  <div className="w-3 h-3 rounded-full bg-primary" />
                )}
              </div>
            </Card>
          );
        })}
      </div>
      
      <Button 
        onClick={onStartGame} 
        size="lg" 
        className="w-full animate-pulse-glow"
        disabled={!selectedMode}
      >
        Start {gameModes.find(m => m.id === selectedMode)?.name || "Game"}
      </Button>
    </div>
  );
};