import "./StatusPanel.css";

export interface StatusItem {
  id: string;
  label: string;
  icon: string;
  value: number;
  color: string;
}

interface StatusPanelProps {
  items: StatusItem[];
}

export function StatusPanel({ items }: StatusPanelProps) {
  return (
    <section className="status-panel" aria-label="Status da raposa">
      {items.map((item) => (
        <div className="status-row" key={item.id}>
          <span className="status-icon" aria-hidden="true">
            {item.icon}
          </span>

          <div
            className="status-track"
            role="progressbar"
            aria-label={item.label}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.max(0, Math.min(100, item.value))}
          >
            <div
              className="status-fill"
              style={{
                width: `${Math.max(0, Math.min(100, item.value))}%`,
                background: item.color,
              }}
            />
          </div>
        </div>
      ))}
    </section>
  );
}