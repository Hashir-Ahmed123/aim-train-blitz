import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Settings } from "lucide-react";

export interface GameSettings {
  targetSize: number;
  gameDuration: number;
  targetLifetime: number;
  soundEffects: boolean;
  showTrails: boolean;
}

interface GameSettingsProps {
  settings: GameSettings;
  onSettingsChange: (settings: GameSettings) => void;
  onClose: () => void;
}

export const GameSettingsPanel = ({ settings, onSettingsChange, onClose }: GameSettingsProps) => {
  const [localSettings, setLocalSettings] = useState(settings);

  const updateSetting = <K extends keyof GameSettings>(
    key: K,
    value: GameSettings[K]
  ) => {
    const newSettings = { ...localSettings, [key]: value };
    setLocalSettings(newSettings);
  };

  const handleSave = () => {
    onSettingsChange(localSettings);
    onClose();
  };

  const handleReset = () => {
    const defaultSettings: GameSettings = {
      targetSize: 48,
      gameDuration: 30000,
      targetLifetime: 2000,
      soundEffects: true,
      showTrails: false,
    };
    setLocalSettings(defaultSettings);
  };

  return (
    <Card className="p-6 space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <Settings className="w-5 h-5" />
        <h3 className="text-lg font-semibold">Game Settings</h3>
      </div>

      <div className="space-y-6">
        <div>
          <Label className="text-sm font-medium">
            Target Size: {localSettings.targetSize}px
          </Label>
          <Slider
            value={[localSettings.targetSize]}
            onValueChange={([value]) => updateSetting("targetSize", value)}
            min={24}
            max={72}
            step={6}
            className="mt-2"
          />
          <p className="text-xs text-muted-foreground mt-1">
            Smaller targets = higher difficulty
          </p>
        </div>

        <div>
          <Label className="text-sm font-medium">
            Game Duration: {localSettings.gameDuration / 1000}s
          </Label>
          <Slider
            value={[localSettings.gameDuration]}
            onValueChange={([value]) => updateSetting("gameDuration", value)}
            min={15000}
            max={60000}
            step={5000}
            className="mt-2"
          />
        </div>

        <div>
          <Label className="text-sm font-medium">
            Target Lifetime: {localSettings.targetLifetime / 1000}s
          </Label>
          <Slider
            value={[localSettings.targetLifetime]}
            onValueChange={([value]) => updateSetting("targetLifetime", value)}
            min={1000}
            max={4000}
            step={250}
            className="mt-2"
          />
          <p className="text-xs text-muted-foreground mt-1">
            How long targets stay visible
          </p>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <Label className="text-sm font-medium">Sound Effects</Label>
            <p className="text-xs text-muted-foreground">
              Audio feedback for hits and misses
            </p>
          </div>
          <Switch
            checked={localSettings.soundEffects}
            onCheckedChange={(checked) => updateSetting("soundEffects", checked)}
          />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <Label className="text-sm font-medium">Show Trails</Label>
            <p className="text-xs text-muted-foreground">
              Visual effect when clicking
            </p>
          </div>
          <Switch
            checked={localSettings.showTrails}
            onCheckedChange={(checked) => updateSetting("showTrails", checked)}
          />
        </div>
      </div>

      <div className="flex gap-3 pt-4">
        <Button onClick={handleReset} variant="outline" className="flex-1">
          Reset to Default
        </Button>
        <Button onClick={handleSave} className="flex-1">
          Save Settings
        </Button>
      </div>
    </Card>
  );
};