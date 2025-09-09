import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface GameStatsProps {
  hits: number;
  misses: number;
  accuracy: number;
  averageReactionTime: number;
  timeRemaining: number;
  gameState: "idle" | "playing" | "finished";
}

export const GameStats = ({ 
  hits, 
  misses, 
  accuracy, 
  averageReactionTime, 
  timeRemaining,
  gameState 
}: GameStatsProps) => {
  const totalShots = hits + misses;
  const timeProgress = gameState === "playing" ? (30000 - timeRemaining) / 30000 * 100 : 0;

  return (
    <div className="space-y-4">
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Live Stats</h3>
        
        {gameState === "playing" && (
          <div className="mb-4">
            <div className="flex justify-between text-sm mb-2">
              <span>Time</span>
              <span>{Math.ceil(timeRemaining / 1000)}s</span>
            </div>
            <Progress value={timeProgress} className="h-2" />
          </div>
        )}

        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Hits</span>
            <span className="text-2xl font-bold text-game-success">{hits}</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Misses</span>
            <span className="text-2xl font-bold text-game-miss">{misses}</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Accuracy</span>
            <span className="text-2xl font-bold text-primary">{accuracy}%</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Avg Time</span>
            <span className="text-2xl font-bold text-primary">
              {averageReactionTime}ms
            </span>
          </div>
        </div>
      </Card>

      {gameState === "finished" && (
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Final Results</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Total Targets:</span>
              <span>{totalShots}</span>
            </div>
            <div className="flex justify-between">
              <span>Hit Rate:</span>
              <span className="text-game-success">{hits}/{totalShots}</span>
            </div>
            <div className="flex justify-between">
              <span>Performance:</span>
              <span className={accuracy >= 80 ? "text-game-success" : accuracy >= 60 ? "text-primary" : "text-game-miss"}>
                {accuracy >= 80 ? "Excellent!" : accuracy >= 60 ? "Good!" : "Keep practicing!"}
              </span>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};