
import "./App.css";

import { InteractiveObject } from "./components/hud/interactives";
import { HUD } from "./components/hud/Hud";


function App() {
  return (
    <main className="game-screen">
      <div className="game-frame">
        <div
          className="field-background"
          aria-label="Campo durante o dia"
        />
         <HUD
          stars={1200}
          onOpenRanking={() => console.log("Abrir ranking")}
          onToggleMusic={() => console.log("Alternar música")}
          onOpenMinigames={() => console.log("Abrir minijogos")}
        />

        {/* Objetos interativos do cenário */}
        <InteractiveObject
          label="Mochila"
          image="/assets/objects/mochila.png"
          position={{ left: "2%", top: "58%" }}
          width="10%"
          onClick={() => console.log("Abrir mochila")}
        />

        <InteractiveObject
          label="Árvore"
          image="/assets/objects/arvore.png"
          position={{ left: "80%", top: "25%" }}
          width="15%"
          onClick={() => console.log("Interagir com a árvore")}
        />

        <InteractiveObject
          label="Pente"
          image="/assets/objects/pente.png"
          position={{ left: "28%", top: "72%" }}
          width="8%"
          onClick={() => console.log("Interagir com o pente")}
        />

        <InteractiveObject
          label="Cesta"
          image="/assets/objects/cesta.png"
          position={{ left: "68%", top: "68%" }}
          width="13%"
          onClick={() => console.log("Abrir cesta")}
        />
       
      </div>
    </main>
  );
}

export default App;