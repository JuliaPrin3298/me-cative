
import "./App.css";
import { useEffect, useState } from "react";
import { getWallet, getInventory, getFox } from "./services/api";
import { carregarProgresso, salvarProgresso } from "./services/localStorage";

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
  const [estrelas, setEstrelas] = useState(0);
  const [fome, setFome] = useState(0);
  const [energia, setEnergia] = useState(0);
  const [humor, setHumor] = useState(0);

  useEffect(() => {
    async function carregarDados() {
      const progresso = carregarProgresso();

      if (progresso) {
        setEstrelas(progresso.estrelas);
        setFome(progresso.fome);
        setEnergia(progresso.energia);
        setHumor(progresso.humor);

        return;
      }

      try {
        const carteira = await getWallet();
        const inventario = await getInventory();
        const raposa = await getFox();

        setEstrelas(carteira.estrelas);
        setFome(raposa.fome);
        setEnergia(raposa.energia);
        setHumor(raposa.humor);

        salvarProgresso({
          estrelas: carteira.estrelas,
          fome: raposa.fome,
          energia: raposa.energia,
          humor: raposa.humor,
          inventario,
        });
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      }
    }

    carregarDados();
  }, []);

  return (
    <main className="game-screen">
      <div className="game-frame">
        <div
          className="field-background"
          aria-label="Campo durante o dia"
        />
        <HUD
          stars={estrelas}
          fome={fome}
          energia={energia}
          humor={humor}
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
          <InventoryModal
            onClose={() => setActiveModal(null)}
            stars={estrelas}
            onStarsChange={setEstrelas}
          />
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