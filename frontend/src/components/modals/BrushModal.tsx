
import { ModalBase } from "./ModalBase";
import { PhaserGame } from "../../game/PhaserGame";
import { ModalFoxScene } from "../../game/scenes/ModalFoxScene";
import "./CareModal.css";

interface Props {
  onClose: () => void;
}

export function BrushModal({ onClose }: Props) {
  return (
    <ModalBase title="Cuidar da raposa" onClose={onClose}>
      <div className="care-modal-content">
        <div className="care-modal-fox">
          <PhaserGame scene={ModalFoxScene} />
        </div>

        <div className="care-modal-inventory">
          <h3>Cuidados</h3>

          <div className="care-modal-items">
            {/* O pente e os demais itens de cuidado entrarão aqui */}
          </div>
        </div>
      </div>
    </ModalBase>
  );
}
