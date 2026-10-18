import { StatusPanel, type StatusItem } from "./StatusPanel";
import { CurrencyDisplay } from "./CurrencyDisplay";
import { HudIconButton } from "./HudIconButton";
import "./HUD.css";

interface HUDProps {
  stars: number;
  fome: number;
  energia: number;
  humor: number;
  onOpenRanking: () => void;
  onToggleMusic: () => void;
  onOpenMinigames: () => void;
}

function getHumorIcon(humor: number) {
  if (humor >= 70) {
    return "/assets/ui/starHappy.png";
  }

  if (humor >= 40) {
    return "/assets/ui/starNeutral.png";
  }

  return "/assets/ui/starSad.png";
}

const initialStatus = (
  fome: number,
  energia: number,
  humor: number,
): StatusItem[] => [
    {
      id: "bond",
      label: "Energia",
      iconSrc: "/assets/ui/sleep.png",
      value: energia,
      color: "linear-gradient(90deg, #243db8, #35ead5)",
    },
    {
      id: "hunger",
      label: "Fome",
      iconSrc: "/assets/ui/hungry.png",
      value: fome,
      color: "linear-gradient(90deg, #ffb02e, #ff4d42)",
    },
    {
      id: "happiness",
      label: "Humor",
      iconSrc: getHumorIcon(humor),
      value: humor,
      color: "linear-gradient(90deg, #a67bd0, #37f18a)",
    },
  ];

export function HUD({
  stars,
  fome,
  energia,
  humor,
  onOpenRanking,
  onToggleMusic,
  onOpenMinigames,
}: HUDProps) {
  return (
    <div className="game-hud">
      <div className="hud-status">
        <StatusPanel
          items={initialStatus(fome, energia, humor)}
        />
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