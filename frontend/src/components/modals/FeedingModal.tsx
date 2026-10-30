import { ModalBase } from "./ModalBase";
import { PhaserGame } from "../../game/PhaserGame";
import { ModalFoxScene } from "../../game/scenes/ModalFoxScene";
import "./CareModal.css";

interface Props {
  onClose: () => void;
}

export function FeedingModal({ onClose }: Props) {
  return (
    <ModalBase title="Hora de comer" onClose={onClose}>
      <div className="care-modal-content">
        <div className="care-modal-fox">
          <PhaserGame scene={ModalFoxScene} />
        </div>

        <div className="care-modal-inventory">
          <h3>Comidinhas</h3>

          <div className="care-modal-items">
            {/* Os alimentos do inventário entrarão aqui */}
          </div>
        </div>
      </div>
    </ModalBase>
  );
}
