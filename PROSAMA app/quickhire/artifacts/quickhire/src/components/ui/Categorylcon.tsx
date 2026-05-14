export const CAT_COLORS: Record<string, { light: string; accent: string; dim: string }> = {
  All: { light: "#1E1E2C", accent: "#7B7D96", dim: "#2A2A3C" },
  Moving: { light: "#2A1A1A", accent: "#FF5252", dim: "#3A1A1A" },
  Hospitality: { light: "#2A1E14", accent: "#FF9148", dim: "#3A2214" },
  Errands: { light: "#2A2614", accent: "#FFD166", dim: "#3A3214" },
  Events: { light: "#1A1A2E", accent: "#7B8AFF", dim: "#1E1E3A" },
  Garden: { light: "#142A22", accent: "#00DFA2", dim: "#143A28" },
  Trades: { light: "#142028", accent: "#4CC9F0", dim: "#142A36" },
  Pets: { light: "#2A1A22", accent: "#FF89BB", dim: "#3A1A28" },
};

interface CategoryIconProps {
  category: string;
  size?: number;
  color?: string;
}

export function CategoryIcon({ category, size = 24, color }: CategoryIconProps) {
  const accent = color ?? CAT_COLORS[category]?.accent ?? "#7B7D96";

  const props = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: accent,
    strokeWidth: 2,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  switch (category) {
    case "Moving":
      return (
        <svg {...props}>
          <rect x="1" y="3" width="15" height="13" rx="2" />
          <path d="M16 8h4l3 4v5h-7V8z" />
          <circle cx="5.5" cy="18.5" r="2.5" />
          <circle cx="18.5" cy="18.5" r="2.5" />
        </svg>
      );

    case "Hospitality":
      return (
        <svg {...props}>
          <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
          <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
          <line x1="6" y1="1" x2="6" y2="4" />
          <line x1="10" y1="1" x2="10" y2="4" />
          <line x1="14" y1="1" x2="14" y2="4" />
        </svg>
      );

    case "Errands":
      return (
        <svg {...props}>
          <circle cx="9" cy="21" r="1" />
          <circle cx="20" cy="21" r="1" />
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
        </svg>
      );

    case "Events":
      return (
        <svg {...props}>
          <rect x="3" y="4" width="18" height="18" rx="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
      );

    case "Garden":
      return (
        <svg {...props}>
          <path d="M12 22V12M12 12C12 12 7 9 7 4a5 5 0 0 1 10 0c0 5-5 8-5 8z" />
        </svg>
      );

    case "Trades":
      return (
        <svg {...props}>
          <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
        </svg>
      );

    case "Pets":
      return (
        <svg {...props}>
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
        </svg>
      );

    default:
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
      );
  }
}