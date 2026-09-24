const base = {
  viewBox: '0 0 48 48',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
};

export function IndependenceIcon(props) {
  return (
    <svg {...base} {...props}>
      <circle cx="24" cy="24" r="16" />
      <path d="M24 8v32M8 24h32" />
    </svg>
  );
}

export function ObjectiveIcon(props) {
  return (
    <svg {...base} {...props}>
      <path d="M6 24c4-10 12-16 18-16s14 6 18 16c-4 10-12 16-18 16S10 34 6 24z" />
      <circle cx="24" cy="24" r="5" />
    </svg>
  );
}

export function TraceableIcon(props) {
  return (
    <svg {...base} {...props}>
      <path d="M12 8h20l6 6v26H12z" />
      <path d="M18 20h12M18 26h12M18 32h8" />
    </svg>
  );
}

export function DigitalIcon(props) {
  return (
    <svg {...base} {...props}>
      <rect x="8" y="10" width="32" height="24" rx="2" />
      <path d="M8 18h32M16 26h6" />
    </svg>
  );
}

export const PILLAR_ICONS = [IndependenceIcon, ObjectiveIcon, TraceableIcon, DigitalIcon];

export function BlueprintArt(props) {
  return (
    <svg viewBox="0 0 400 400" fill="none" {...props}>
      <rect x="40" y="40" width="180" height="120" stroke="white" strokeWidth="1" />
      <rect x="60" y="60" width="60" height="40" stroke="white" strokeWidth="1" />
      <line x1="40" y1="160" x2="220" y2="160" stroke="white" strokeWidth="1" />
      <circle cx="260" cy="220" r="60" stroke="white" strokeWidth="1" />
      <line x1="260" y1="160" x2="260" y2="280" stroke="white" strokeWidth="1" />
      <line x1="200" y1="220" x2="320" y2="220" stroke="white" strokeWidth="1" />
      <path d="M40 300 L120 260 L200 300 L280 260" stroke="white" strokeWidth="1" />
    </svg>
  );
}
