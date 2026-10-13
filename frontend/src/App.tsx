
import "./App.css";
import { useState } from "react";

import { InteractiveObject } from "./components/interactives";
import { HUD } from "./components/hud/Hud";
import {
  BrushModal,
  InventoryModal,
  RestModal,
  FeedingModal,
  MinigamesModal,
  RankingModal,
} from "./components/modals";
import { PhaserGame } from "./game/PhaserGame";


function App() {
type ModalType =
  | "brush"
  | "inventory"
  | "rest"
  | "feeding"
  | "minigames"
  | "ranking";

  const [activeModal, setActiveModal] = useState<ModalType | null>(null);
  return (
    <main className="game-screen">
      <div className="game-frame">
        <div
          className="field-background"
          aria-label="Campo durante o dia"
        />
        <HUD
          stars={1200}
          onOpenRanking={() => setActiveModal("ranking")}
          onToggleMusic={() => console.log("Alternar música")}
          onOpenMinigames={() => setActiveModal("minigames")}
        />
        <PhaserGame />
        
        {/* Objetos interativos do cenário */}
        <InteractiveObject
          label="Mochila"
          image="/assets/objects/mochila.png"
          position={{ left: "2%", top: "58%" }}
          width="10%"
          onClick={() => setActiveModal("inventory")}
        />

        <InteractiveObject
          label="Árvore"
          image="/assets/objects/arvore.png"
          position={{ left: "80%", top: "25%" }}
          width="15%"
          onClick={() => setActiveModal("rest")}
        />

        <InteractiveObject
          label="Pente"
          image="/assets/objects/pente.png"
          position={{ left: "28%", top: "72%" }}
          width="8%"
          onClick={() => setActiveModal("brush")}
        />

        <InteractiveObject
          label="Cesta"
          image="/assets/objects/cesta.png"
          position={{ left: "68%", top: "68%" }}
          width="13%"
          onClick={() => setActiveModal("feeding")}
        />

        {activeModal === "brush" && (
          <BrushModal onClose={() => setActiveModal(null)} />
        )}

        {activeModal === "inventory" && (
          <InventoryModal onClose={() => setActiveModal(null)} />
        )}

        {activeModal === "rest" && (
          <RestModal onClose={() => setActiveModal(null)} />
        )}

        {activeModal === "feeding" && (
          <FeedingModal onClose={() => setActiveModal(null)} />
        )}
        {activeModal === "minigames" && (
          <MinigamesModal onClose={() => setActiveModal(null)} />
        )}

        {activeModal === "ranking" && (
          <RankingModal onClose={() => setActiveModal(null)} />
        )}

      </div>
    </main>
  );
}

export default App;