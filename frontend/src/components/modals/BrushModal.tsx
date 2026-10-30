import { useRef, useState } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";
import type Phaser from "phaser";
import { ModalBase } from "./ModalBase";
import { PhaserGame } from "../../game/PhaserGame";
import { ModalFoxScene } from "../../game/scenes/ModalFoxScene";
import {
  carregarProgresso,
  salvarProgresso,
} from "../../services/localStorage";
import "./CareModal.css";

interface Props {
  onClose: () => void;
  humor: number;
  onHumorChange: (humor: number) => void;
}

// Mesmo valor usado pelo backend em pentear_raposa()
const HUMOR_POR_ESCOVADA = 10;
const MAXIMO = 100;

export function BrushModal({ onClose, humor, onHumorChange }: Props) {
  const gameRef = useRef<Phaser.Game | null>(null);
  const foxRef = useRef<HTMLDivElement>(null);

  const [arrastando, setArrastando] = useState(false);
  const [sobreRaposa, setSobreRaposa] = useState(false);
  const [posicao, setPosicao] = useState({ x: 0, y: 0 });
  const [mensagem, setMensagem] = useState("");

  // O canvas do Phaser tem pointer-events: none, então a área da raposa
  // é detectada pelo retângulo da coluna esquerda.
  function estaSobreRaposa(x: number, y: number) {
    const area = foxRef.current?.getBoundingClientRect();

    if (!area) return false;

    return (
      x >= area.left && x <= area.right && y >= area.top && y <= area.bottom
    );
  }

  function escovar() {
    const scene = gameRef.current?.scene.getScene("ModalFoxScene") as
      | ModalFoxScene
      | null
      | undefined;

    scene?.brush();

    if (humor >= MAXIMO) {
      setMensagem("A raposa já está superfeliz!");
      return;
    }

    const novoHumor = Math.min(MAXIMO, humor + HUMOR_POR_ESCOVADA);
    const progresso = carregarProgresso();

    if (progresso) {
      salvarProgresso({ ...progresso, humor: novoHumor });
    }

    onHumorChange(novoHumor);
    setMensagem(`A raposa adorou! (+${novoHumor - humor} de humor)`);
  }

  function aoPressionar(event: ReactPointerEvent<HTMLButtonElement>) {
    event.currentTarget.setPointerCapture(event.pointerId);
    setPosicao({ x: event.clientX, y: event.clientY });
    setArrastando(true);
  }

  function aoMover(event: ReactPointerEvent<HTMLButtonElement>) {
    if (!arrastando) return;

    setPosicao({ x: event.clientX, y: event.clientY });
    setSobreRaposa(estaSobreRaposa(event.clientX, event.clientY));
  }

  function aoSoltar(event: ReactPointerEvent<HTMLButtonElement>) {
    if (!arrastando) return;

    const soltouNaRaposa = estaSobreRaposa(event.clientX, event.clientY);

    setArrastando(false);
    setSobreRaposa(false);

    if (soltouNaRaposa) {
      escovar();
    }
  }

  function aoCancelar() {
    setArrastando(false);
    setSobreRaposa(false);
  }

  return (
    <ModalBase title="Cuidar da raposa" onClose={onClose}>
      <div className="care-modal-content">
        <div
          ref={foxRef}
          className={`care-modal-fox${sobreRaposa ? " is-drop-target" : ""}`}
        >
          <PhaserGame
            scene={ModalFoxScene}
            onReady={(game) => {
              gameRef.current = game;
            }}
          />
        </div>

        <div className="care-modal-inventory">
          <h3>Cuidados</h3>

          <div className="care-modal-items">
            <button
              type="button"
              className={`care-modal-item care-modal-draggable${
                arrastando ? " is-dragging" : ""
              }`}
              onPointerDown={aoPressionar}
              onPointerMove={aoMover}
              onPointerUp={aoSoltar}
              onPointerCancel={aoCancelar}
              // detail === 0: ativado pelo teclado (Enter/Espaço). Com o mouse, o clique
              // que sobra depois de arrastar é ignorado.
              onClick={(event) => {
                if (event.detail === 0) escovar();
              }}
              aria-label="Pente: arraste até a raposa para escovar"
            >
              <img
                src="/assets/objects/pente.png"
                alt=""
                draggable={false}
              />
              <span className="care-modal-item-name">Pente</span>
            </button>

            {arrastando && (
              <img
                className="care-modal-ghost"
                src="/assets/objects/pente.png"
                alt=""
                style={{ left: posicao.x, top: posicao.y }}
              />
            )}
          </div>

          <p className="care-modal-status">
            {mensagem || "Arraste o pente até a raposa!"}
          </p>
        </div>
      </div>
    </ModalBase>
  );
}