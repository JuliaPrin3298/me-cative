
import "./App.css";
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
      </div>
    </main>
  );
}

export default App;