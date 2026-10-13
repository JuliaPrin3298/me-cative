import { ModalBase } from "./ModalBase";

interface RankingModalProps {
  onClose: () => void;
}

export function RankingModal({ onClose }: RankingModalProps) {
  return (
    <ModalBase title="Ranking" onClose={onClose}>
      <p>Veja a classificação dos jogadores!</p>

      {/* A lista de jogadores será adicionada aqui */}
      <div className="modal-placeholder">
        Em breve: ranking dos jogadores.
      </div>
    </ModalBase>
  );
}