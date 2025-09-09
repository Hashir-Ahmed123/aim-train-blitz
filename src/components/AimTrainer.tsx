import { useState, useEffect, useCallback } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Target } from "@/components/Target";
import { GameStats } from "@/components/GameStats";
import { GameModes, GameMode } from "@/components/GameModes";
import { GameSettingsPanel, GameSettings } from "@/components/GameSettings";
import { Leaderboard, Score } from "@/components/Leaderboard";
import { useSoundEffects } from "@/hooks/useSoundEffects";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { toast } from "sonner";
import { Settings, BarChart3 } from "lucide-react";

type GameState = "menu" | "playing" | "finished" | "settings" | "leaderboard";

interface GameData {
  hits: number;
  misses: number;
  reactionTimes: number[];
  totalTargets: number;
}

const DEFAULT_SETTINGS: GameSettings = {
  targetSize: 48,
  gameDuration: 30000,
  targetLifetime: 2000,
  soundEffects: true,
  showTrails: false,
};

const getModeSettings = (mode: GameMode): Partial<GameSettings> => {
  switch (mode) {
    case "speed":
      return { targetSize: 36, targetLifetime: 1500 };
    case "precision":
      return { targetSize: 24, targetLifetime: 3000 };
    default:
      return {};
  }
};

export const AimTrainer = () => {
  const [gameState, setGameState] = useState<GameState>("menu");
  const [selectedMode, setSelectedMode] = useState<GameMode>("classic");
  const [settings, setSettings] = useLocalStorage("aim-trainer-settings", DEFAULT_SETTINGS);
  const [scores, setScores] = useLocalStorage<Score[]>("aim-trainer-scores", []);
  
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
  
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [clickEffect, setClickEffect] = useState<{ x: number; y: number; id: number } | null>(null);

  const { playHitSound, playMissSound, playStartSound, playEndSound } = useSoundEffects(settings.soundEffects);

  const currentGameSettings = { ...settings, ...getModeSettings(selectedMode) };
  const maxTargets = selectedMode === "speed" ? 50 : 30;

  const generateTarget = useCallback(() => {
    if (gameData.totalTargets >= maxTargets) {
      setGameState("finished");
      playEndSound();
      return;
    }

    const gameArea = document.getElementById("game-area");
    if (!gameArea) return;

    const rect = gameArea.getBoundingClientRect();
    const margin = currentGameSettings.targetSize / 2 + 10;
    
    const x = Math.random() * (rect.width - margin * 2) + margin;
    const y = Math.random() * (rect.height - margin * 2) + margin;

    setCurrentTarget({
      id: Date.now(),
      x,
      y,
      appearTime: Date.now(),
    });

    setGameData(prev => ({ ...prev, totalTargets: prev.totalTargets + 1 }));
  }, [gameData.totalTargets, maxTargets, currentGameSettings.targetSize, playEndSound]);

  const handleTargetHit = useCallback((targetId: number, appearTime: number) => {
    if (!currentTarget || currentTarget.id !== targetId) return;

    const reactionTime = Date.now() - appearTime;
    setGameData(prev => ({
      ...prev,
      hits: prev.hits + 1,
      reactionTimes: [...prev.reactionTimes, reactionTime],
    }));
    
    setCurrentTarget(null);
    playHitSound();
    toast.success(`${reactionTime}ms`);
    
    setTimeout(generateTarget, selectedMode === "speed" ? 300 : 500);
  }, [currentTarget, generateTarget, selectedMode, playHitSound]);

  const handleTargetMiss = useCallback(() => {
    if (!currentTarget) return;

    setGameData(prev => ({ ...prev, misses: prev.misses + 1 }));
    setCurrentTarget(null);
    playMissSound();
    
    setTimeout(generateTarget, selectedMode === "speed" ? 300 : 500);
  }, [currentTarget, generateTarget, selectedMode, playMissSound]);

  const handleGameAreaClick = useCallback((e: React.MouseEvent) => {
    if (currentTarget) {
      handleTargetMiss();
      toast.error("Missed!");
    }

    // Show click effect
    if (settings.showTrails) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setClickEffect({ x, y, id: Date.now() });
      setTimeout(() => setClickEffect(null), 500);
    }
  }, [currentTarget, handleTargetMiss, settings.showTrails]);

  const startGame = () => {
    setGameState("playing");
    setGameData({ hits: 0, misses: 0, reactionTimes: [], totalTargets: 0 });
    setTimeRemaining(currentGameSettings.gameDuration);
    setCurrentTarget(null);
    playStartSound();
    
    setTimeout(generateTarget, 1000);
    toast.info(`${selectedMode.charAt(0).toUpperCase() + selectedMode.slice(1)} mode started!`);
  };

  const finishGame = useCallback(() => {
    setGameState("finished");
    playEndSound();
    
    // Save score
    if (gameData.hits > 0) {
      const newScore: Score = {
        id: Date.now().toString(),
        mode: selectedMode,
        accuracy: Math.round((gameData.hits / gameData.totalTargets) * 100),
        averageTime: Math.round(gameData.reactionTimes.reduce((a, b) => a + b, 0) / gameData.reactionTimes.length),
        hits: gameData.hits,
        date: new Date().toISOString(),
      };
      setScores(prev => [...prev, newScore]);
    }
  }, [gameData, selectedMode, setScores, playEndSound]);

  const backToMenu = () => {
    setGameState("menu");
    setGameData({ hits: 0, misses: 0, reactionTimes: [], totalTargets: 0 });
    setCurrentTarget(null);
  };

  // Game timer
  useEffect(() => {
    if (gameState !== "playing") return;

    const interval = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 100) {
          finishGame();
          return 0;
        }
        return prev - 100;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [gameState, finishGame]);

  // Target timeout
  useEffect(() => {
    if (!currentTarget || gameState !== "playing") return;

    const timeout = setTimeout(() => {
      handleTargetMiss();
      toast.error("Target expired!");
    }, currentGameSettings.targetLifetime);

    return () => clearTimeout(timeout);
  }, [currentTarget, gameState, handleTargetMiss, currentGameSettings.targetLifetime]);

  const averageReactionTime = gameData.reactionTimes.length > 0 
    ? Math.round(gameData.reactionTimes.reduce((a, b) => a + b, 0) / gameData.reactionTimes.length)
    : 0;

  const accuracy = gameData.totalTargets > 0 
    ? Math.round((gameData.hits / gameData.totalTargets) * 100)
    : 0;

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">Aim Trainer Pro</h1>
          <p className="text-muted-foreground">
            Train your aim with multiple game modes and track your progress
          </p>
        </div>

        {/* Menu Navigation */}
        {gameState !== "playing" && (
          <div className="flex justify-center gap-2 mb-6">
            <Button 
              variant={gameState === "menu" ? "default" : "outline"}
              onClick={() => setGameState("menu")}
            >
              Game Modes
            </Button>
            <Button 
              variant={gameState === "settings" ? "default" : "outline"}
              onClick={() => setGameState("settings")}
            >
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
            <Button 
              variant={gameState === "leaderboard" ? "default" : "outline"}
              onClick={() => setGameState("leaderboard")}
            >
              <BarChart3 className="w-4 h-4 mr-2" />
              Leaderboard
            </Button>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Main Content Area */}
          <div className="lg:col-span-3">
            {gameState === "menu" && (
              <Card className="p-8">
                <GameModes 
                  selectedMode={selectedMode}
                  onModeSelect={setSelectedMode}
                  onStartGame={startGame}
                />
              </Card>
            )}

            {gameState === "settings" && (
              <GameSettingsPanel
                settings={settings}
                onSettingsChange={setSettings}
                onClose={() => setGameState("menu")}
              />
            )}

            {gameState === "leaderboard" && (
              <Leaderboard scores={scores} />
            )}

            {gameState === "playing" && (
              <Card className="relative overflow-hidden">
                <div
                  id="game-area"
                  className="relative h-[600px] bg-game-area cursor-crosshair select-none"
                  onClick={handleGameAreaClick}
                >
                  <div className="absolute top-4 left-4 text-primary font-mono text-xl">
                    {Math.ceil(timeRemaining / 1000)}s
                  </div>
                  <div className="absolute top-4 right-4 text-primary font-mono text-xl">
                    {gameData.totalTargets}/{maxTargets}
                  </div>
                  <div className="absolute top-4 left-1/2 transform -translate-x-1/2 text-primary font-medium">
                    {selectedMode.toUpperCase()} MODE
                  </div>
                  
                  {currentTarget && (
                    <Target
                      key={currentTarget.id}
                      x={currentTarget.x}
                      y={currentTarget.y}
                      size={currentGameSettings.targetSize}
                      onHit={() => handleTargetHit(currentTarget.id, currentTarget.appearTime)}
                    />
                  )}
                  
                  {clickEffect && settings.showTrails && (
                    <div
                      className="absolute w-8 h-8 rounded-full bg-white/20 animate-ping pointer-events-none"
                      style={{
                        left: clickEffect.x - 16,
                        top: clickEffect.y - 16,
                      }}
                    />
                  )}
                </div>
              </Card>
            )}

            {gameState === "finished" && (
              <Card className="relative overflow-hidden">
                <div className="h-[600px] bg-game-area flex items-center justify-center">
                  <div className="text-center">
                    <h2 className="text-3xl font-bold mb-6">Game Complete!</h2>
                    <div className="space-y-3 mb-8">
                      <div className="text-2xl">
                        Mode: <span className="text-primary">{selectedMode.toUpperCase()}</span>
                      </div>
                      <div className="text-2xl">
                        Hits: <span className="text-game-success">{gameData.hits}</span>/{gameData.totalTargets}
                      </div>
                      <div className="text-2xl">
                        Accuracy: <span className="text-primary">{accuracy}%</span>
                      </div>
                      <div className="text-2xl">
                        Avg Time: <span className="text-primary">{averageReactionTime}ms</span>
                      </div>
                    </div>
                    <div className="flex gap-4 justify-center">
                      <Button onClick={startGame} size="lg">
                        Play Again
                      </Button>
                      <Button onClick={backToMenu} variant="outline" size="lg">
                        Menu
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            )}
          </div>

          {/* Stats Panel */}
          {(gameState === "playing" || gameState === "finished") && (
            <div className="space-y-4">
              <GameStats
                hits={gameData.hits}
                misses={gameData.misses}
                accuracy={accuracy}
                averageReactionTime={averageReactionTime}
                timeRemaining={timeRemaining}
                gameState={gameState === "playing" ? "playing" : "finished"}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};