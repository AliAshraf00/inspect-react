// Hand-drawn line icons matching the original design exactly.
// Each accepts standard SVG props (className, etc.)

const base = {
  viewBox: '0 0 48 48',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
};

export function ArchitecturalIcon(props) {
  return (
    <svg {...base} {...props}>
      <path d="M10 42V18L24 8l14 10v24" />
      <path d="M18 42V26h12v16" />
      <path d="M10 42h28" />
      <path d="M15 20h4M29 20h4" />
    </svg>
  );
}

export function StructuralIcon(props) {
  return (
    <svg {...base} {...props}>
      <path d="M6 34L24 10L42 34" />
      <path d="M6 34h36" />
      <path d="M15 34V22M24 34V16M33 34V22" />
    </svg>
  );
}

export function ElectricalIcon(props) {
  return (
    <svg {...base} {...props}>
      <path d="M26 6l-14 20h10l-4 16 16-22H24z" />
    </svg>
  );
}

export function HvacIcon(props) {
  return (
    <svg {...base} {...props}>
      <circle cx="24" cy="24" r="3" />
      <path d="M24 24c0-8 6-12 10-10s2 12-6 12" />
      <path d="M24 24c8 0 12 6 10 10s-12 2-12-6" />
      <path d="M24 24c0 8-6 12-10 10s-2-12 6-12" />
      <path d="M24 24c-8 0-12-6-10-10s12-2 12 6" />
    </svg>
  );
}

export function PlumbingIcon(props) {
  return (
    <svg {...base} {...props}>
      <path d="M12 14h10a6 6 0 0 1 6 6v2h8" />
      <circle cx="12" cy="14" r="3" />
      <path d="M22 26v4a6 6 0 0 1-6 6" />
      <path d="M24 38c0 3-2.5 5-2.5 5s-2.5-2-2.5-5a2.5 2.5 0 0 1 5 0z" />
    </svg>
  );
}

export function FireIcon(props) {
  return (
    <svg {...base} {...props}>
      <path d="M24 6c8 10-4 12-4 20a4 4 0 0 0 8 0c0-3-2-4-2-8 4 3 6 8 6 12a10 10 0 1 1-20 0C12 20 18 14 24 6z" />
    </svg>
  );
}

export function InsulationIcon(props) {
  return (
    <svg {...base} {...props}>
      <path d="M10 8v32M38 8v32" />
      <path d="M10 15c4 3 4-3 8 0s4-3 8 0 4-3 8 0 4-3 4 0" />
      <path d="M10 24c4 3 4-3 8 0s4-3 8 0 4-3 8 0 4-3 4 0" />
      <path d="M10 33c4 3 4-3 8 0s4-3 8 0 4-3 8 0 4-3 4 0" />
    </svg>
  );
}

export function ComplianceIcon(props) {
  return (
    <svg {...base} {...props}>
      <path d="M24 6l16 6v10c0 10-7 17-16 20-9-3-16-10-16-20V12z" />
      <path d="M18 24l4 4 8-8" />
    </svg>
  );
}

export const SERVICE_ICONS = [
  ArchitecturalIcon,
  StructuralIcon,
  ElectricalIcon,
  HvacIcon,
  PlumbingIcon,
  FireIcon,
  InsulationIcon,
  ComplianceIcon,
];
