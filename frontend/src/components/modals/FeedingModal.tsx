import { useRef, useState } from "react";
import type Phaser from "phaser";
import { ModalBase } from "./ModalBase";
import { PhaserGame } from "../../game/PhaserGame";
import { ModalFoxScene } from "../../game/scenes/ModalFoxScene";
import { getFoodImage } from "../../data/foodImages";
import { getFoodEffect } from "../../data/foodEffects";
import {
  carregarProgresso,
  salvarProgresso,
} from "../../services/localStorage";
import "./CareModal.css";

interface Props {
  onClose: () => void;
  fome: number;
  humor: number;
  onFomeChange: (fome: number) => void;
  onHumorChange: (humor: number) => void;
}

const MAXIMO = 100;

export function FeedingModal({
  onClose,
  fome,
  humor,
  onFomeChange,
  onHumorChange,
}: Props) {
  const gameRef = useRef<Phaser.Game | null>(null);
  const [mensagem, setMensagem] = useState("");
  const [inventario, setInventario] = useState(
    () => carregarProgresso()?.inventario.filter((i) => i.quantidade > 0) ?? []
  );

  function alimentar(foodId: number) {
    const progresso = carregarProgresso();
    const item = progresso?.inventario.find((i) => i.food_id === foodId);

    if (!progresso || !item || item.quantidade <= 0) return;

    if (fome >= MAXIMO) {
      setMensagem("A raposa já está de barriguinha cheia!");
      return;
    }

    const novoInventario = progresso.inventario
      .map((i) =>
        i.food_id === foodId ? { ...i, quantidade: i.quantidade - 1 } : i
      )
      .filter((i) => i.quantidade > 0);

    const efeito = getFoodEffect(item.nome);
    const novaFome = Math.min(MAXIMO, fome + efeito.fome);
    const novoHumor = Math.min(MAXIMO, humor + efeito.humor);

    salvarProgresso({
      ...progresso,
      fome: novaFome,
      humor: novoHumor,
      inventario: novoInventario,
    });

    setInventario(novoInventario);
    onFomeChange(novaFome);
    onHumorChange(novoHumor);
    setMensagem(`A raposa comeu ${item.nome}! (+${novaFome - fome} de fome)`);

    const scene = gameRef.current?.scene.getScene("ModalFoxScene") as
      | ModalFoxScene
      | null
      | undefined;
    scene?.feed();
  }

  return (
    <ModalBase title="Hora de comer" onClose={onClose}>
      <div className="care-modal-content">
        <div className="care-modal-fox">
          <PhaserGame
            scene={ModalFoxScene}
            onReady={(game) => {
              gameRef.current = game;
            }}
          />
        </div>

        <div className="care-modal-inventory">
          <h3>Comidinhas</h3>

          {inventario.length === 0 ? (
            <p className="care-modal-status">
              Seu inventário está vazio. Compre comidinhas na mochila!
            </p>
          ) : (
            <div className="care-modal-items">
              {inventario.map((item) => {
                const imagem = getFoodImage(item.nome);

                return (
                  <button
                    key={item.food_id}
                    type="button"
                    className="care-modal-item"
                    onClick={() => alimentar(item.food_id)}
                    aria-label={`Dar ${item.nome} para a raposa (${item.quantidade} disponíveis)`}
                  >
                    {imagem ? (
                      <img src={imagem} alt="" />
                    ) : (
                      <span aria-hidden="true">🍽️</span>
                    )}
                    <span className="care-modal-item-name">{item.nome}</span>
                    <span className="care-modal-item-qty">
                      {item.quantidade}
                    </span>
                  </button>
                );
              })}
            </div>
          )}

          {mensagem && (
            <p className="care-modal-status" role="status">
              {mensagem}
            </p>
          )}
        </div>
      </div>
    </ModalBase>
  );
}