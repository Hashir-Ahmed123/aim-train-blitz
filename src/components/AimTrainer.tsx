import { useState, useEffect, useCallback } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Target } from "@/components/Target";
import { GameStats } from "@/components/GameStats";
import { toast } from "sonner";

type GameState = "idle" | "playing" | "finished";

interface GameData {
  hits: number;
  misses: number;
  reactionTimes: number[];
  totalTargets: number;
}

const GAME_DURATION = 30000; // 30 seconds
const TARGET_LIFETIME = 2000; // 2 seconds per target
const MAX_TARGETS = 30;

export const AimTrainer = () => {
  const [gameState, setGameState] = useState<GameState>("idle");
  const [gameData, setGameData] = useState<GameData>({
    hits: 0,
    misses: 0,
    reactionTimes: [],
    totalTargets: 0,
  });
  const [currentTarget, setCurrentTarget] = useState<{
    id: number;
    x: number;
    y: number;
    appearTime: number;
  } | null>(null);
  const [timeRemaining, setTimeRemaining] = useState(GAME_DURATION);

  const generateTarget = useCallback(() => {
    if (gameData.totalTargets >= MAX_TARGETS) {
      setGameState("finished");
      return;
    }

    const gameArea = document.getElementById("game-area");
    if (!gameArea) return;

    const rect = gameArea.getBoundingClientRect();
    const margin = 50; // Target radius + some padding
    
    const x = Math.random() * (rect.width - margin * 2) + margin;
    const y = Math.random() * (rect.height - margin * 2) + margin;

    setCurrentTarget({
      id: Date.now(),
      x,
      y,
      appearTime: Date.now(),
    });

    setGameData(prev => ({ ...prev, totalTargets: prev.totalTargets + 1 }));
  }, [gameData.totalTargets]);

  const handleTargetHit = useCallback((targetId: number, appearTime: number) => {
    if (!currentTarget || currentTarget.id !== targetId) return;

    const reactionTime = Date.now() - appearTime;
    setGameData(prev => ({
      ...prev,
      hits: prev.hits + 1,
      reactionTimes: [...prev.reactionTimes, reactionTime],
    }));
    
    setCurrentTarget(null);
    toast.success(`${reactionTime}ms`);
    
    // Generate next target after short delay
    setTimeout(generateTarget, 500);
  }, [currentTarget, generateTarget]);

  const handleTargetMiss = useCallback(() => {
    if (!currentTarget) return;

    setGameData(prev => ({ ...prev, misses: prev.misses + 1 }));
    setCurrentTarget(null);
    
    // Generate next target after short delay
    setTimeout(generateTarget, 500);
  }, [currentTarget, generateTarget]);

  const handleGameAreaClick = useCallback(() => {
    if (currentTarget) {
      handleTargetMiss();
      toast.error("Missed!");
    }
  }, [currentTarget, handleTargetMiss]);

  const startGame = () => {
    setGameState("playing");
    setGameData({ hits: 0, misses: 0, reactionTimes: [], totalTargets: 0 });
    setTimeRemaining(GAME_DURATION);
    setCurrentTarget(null);
    
    // Generate first target
    setTimeout(generateTarget, 1000);
    toast.info("Game started! Click the targets!");
  };

  const resetGame = () => {
    setGameState("idle");
    setGameData({ hits: 0, misses: 0, reactionTimes: [], totalTargets: 0 });
    setCurrentTarget(null);
    setTimeRemaining(GAME_DURATION);
  };

  // Game timer
  useEffect(() => {
    if (gameState !== "playing") return;

    const interval = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 100) {
          setGameState("finished");
          return 0;
        }
        return prev - 100;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [gameState]);

  // Target timeout
  useEffect(() => {
    if (!currentTarget || gameState !== "playing") return;

    const timeout = setTimeout(() => {
      handleTargetMiss();
      toast.error("Target expired!");
    }, TARGET_LIFETIME);

    return () => clearTimeout(timeout);
  }, [currentTarget, gameState, handleTargetMiss]);

  // Finish game when all targets are used
  useEffect(() => {
    if (gameData.totalTargets >= MAX_TARGETS && gameState === "playing") {
      setGameState("finished");
    }
  }, [gameData.totalTargets, gameState]);

  const averageReactionTime = gameData.reactionTimes.length > 0 
    ? Math.round(gameData.reactionTimes.reduce((a, b) => a + b, 0) / gameData.reactionTimes.length)
    : 0;

  const accuracy = gameData.totalTargets > 0 
    ? Math.round((gameData.hits / gameData.totalTargets) * 100)
    : 0;

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">Aim Trainer</h1>
          <p className="text-muted-foreground">
            Click the targets as fast as you can! You have {MAX_TARGETS} targets or 30 seconds.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Game Area */}
          <div className="lg:col-span-3">
            <Card className="relative overflow-hidden">
              <div
                id="game-area"
                className="relative h-[600px] bg-game-area cursor-crosshair select-none"
                onClick={handleGameAreaClick}
              >
                {gameState === "idle" && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <h2 className="text-2xl font-semibold mb-4">Ready to test your aim?</h2>
                      <Button onClick={startGame} size="lg" className="animate-pulse-glow">
                        Start Game
                      </Button>
                    </div>
                  </div>
                )}

                {gameState === "playing" && (
                  <>
                    <div className="absolute top-4 left-4 text-primary font-mono text-xl">
                      {Math.ceil(timeRemaining / 1000)}s
                    </div>
                    <div className="absolute top-4 right-4 text-primary font-mono text-xl">
                      {gameData.totalTargets}/{MAX_TARGETS}
                    </div>
                    {currentTarget && (
                      <Target
                        key={currentTarget.id}
                        x={currentTarget.x}
                        y={currentTarget.y}
                        onHit={() => handleTargetHit(currentTarget.id, currentTarget.appearTime)}
                      />
                    )}
                  </>
                )}

                {gameState === "finished" && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <h2 className="text-2xl font-semibold mb-4">Game Complete!</h2>
                      <div className="space-y-2 mb-6">
                        <p className="text-xl">Hits: <span className="text-game-success">{gameData.hits}</span></p>
                        <p className="text-xl">Accuracy: <span className="text-primary">{accuracy}%</span></p>
                        <p className="text-xl">Avg Time: <span className="text-primary">{averageReactionTime}ms</span></p>
                      </div>
                      <Button onClick={resetGame} size="lg">
                        Play Again
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </Card>
          </div>

          {/* Stats Panel */}
          <div className="space-y-4">
            <GameStats
              hits={gameData.hits}
              misses={gameData.misses}
              accuracy={accuracy}
              averageReactionTime={averageReactionTime}
              timeRemaining={timeRemaining}
              gameState={gameState}
            />
          </div>
        </div>
      </div>
    </div>
  );
};