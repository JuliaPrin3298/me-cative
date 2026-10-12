
import "./InteractiveObject.css";

interface InteractiveObjectProps {
  label: string;
  image: string;
  position: {
    left: string;
    top: string;
  };
  width: string;
  onClick: () => void;
}

export function InteractiveObject({
  label,
  image,
  position,
  width,
  onClick,
}: InteractiveObjectProps) {
  return (
    <button
      type="button"
      className="interactive-object"
      style={{
        left: position.left,
        top: position.top,
        width,
      }}
      aria-label={label}
      onClick={onClick}
    >
      <img src={image} alt="" draggable={false} />
    </button>
  );
}
