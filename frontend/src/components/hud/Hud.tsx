import { StatusPanel, type StatusItem } from "./StatusPanel";
import { CurrencyDisplay } from "./CurrencyDisplay";
import { HudIconButton } from "./HudIconButton";
import "./HUD.css";

interface HUDProps {
  stars: number;
  onOpenRanking: () => void;
  onToggleMusic: () => void;
  onOpenMinigames: () => void;
}

const initialStatus: StatusItem[] = [
  {
    id: "bond",
    label: "Vínculo",
    icon: "✨",
    value: 80,
    color: "linear-gradient(90deg, #243db8, #35ead5)",
  },
  {
    id: "hunger",
    label: "Fome",
    icon: "🧺",
    value: 65,
    color: "linear-gradient(90deg, #ffb02e, #ff4d42)",
  },
  {
    id: "happiness",
    label: "Felicidade",
    icon: "⭐",
    value: 90,
    color: "linear-gradient(90deg, #a67bd0, #37f18a)",
  },
];

export function HUD({
  stars,
  onOpenRanking,
  onToggleMusic,
  onOpenMinigames,
}: HUDProps) {
  return (
    <div className="game-hud">
      <div className="hud-status">
        <StatusPanel items={initialStatus} />
      </div>

      <div className="hud-currency">
        <CurrencyDisplay amount={stars} />
      </div>

      <div className="hud-actions">
        <HudIconButton
          label="Abrir ranking"
          icon="/assets/ui/ranking.png"
          onClick={onOpenRanking}
        />

        <HudIconButton
          label="Ativar ou desativar música"
          icon="/assets/ui/music.png"
          onClick={onToggleMusic}
        />
      </div>

      <div className="hud-minigames">
        <HudIconButton
          label="Abrir minijogos"
          icon="/assets/ui/controle.png"
          onClick={onOpenMinigames}
        />
      </div>
    </div>
  );
}