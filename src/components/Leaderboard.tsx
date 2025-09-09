import { Card } from "@/components/ui/card";
import { Trophy, Medal, Award } from "lucide-react";

export interface Score {
  id: string;
  mode: string;
  accuracy: number;
  averageTime: number;
  hits: number;
  date: string;
}

interface LeaderboardProps {
  scores: Score[];
}

export const Leaderboard = ({ scores }: LeaderboardProps) => {
  const topScores = scores
    .sort((a, b) => {
      // Sort by accuracy first, then by average time
      if (a.accuracy !== b.accuracy) {
        return b.accuracy - a.accuracy;
      }
      return a.averageTime - b.averageTime;
    })
    .slice(0, 10);

  const getRankIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Trophy className="w-5 h-5 text-yellow-400" />;
      case 1:
        return <Medal className="w-5 h-5 text-gray-400" />;
      case 2:
        return <Award className="w-5 h-5 text-amber-600" />;
      default:
        return <span className="w-5 h-5 flex items-center justify-center text-xs font-bold">
          {index + 1}
        </span>;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  if (topScores.length === 0) {
    return (
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Leaderboard</h3>
        <div className="text-center text-muted-foreground">
          <Trophy className="w-12 h-12 mx-auto mb-2 opacity-50" />
          <p>No scores yet. Start playing to set your first record!</p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-4">Leaderboard</h3>
      <div className="space-y-2">
        {topScores.map((score, index) => (
          <div
            key={score.id}
            className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
              index < 3 ? "bg-gradient-to-r from-primary/10 to-transparent" : "hover:bg-muted/50"
            }`}
          >
            <div className="flex-shrink-0">
              {getRankIcon(index)}
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs px-2 py-1 rounded-full bg-primary/20 text-primary font-medium">
                  {score.mode.toUpperCase()}
                </span>
                <span className="text-xs text-muted-foreground">
                  {formatDate(score.date)}
                </span>
              </div>
              <div className="flex items-center gap-4 text-sm">
                <span className="text-game-success font-medium">
                  {score.accuracy}%
                </span>
                <span className="text-primary">
                  {score.averageTime}ms avg
                </span>
                <span className="text-muted-foreground">
                  {score.hits} hits
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};