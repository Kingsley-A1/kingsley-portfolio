"use client";

const COLORS = [
  { suit: "#4f46e5", skin: "#fbbf24", shoe: "#312e81" },   // Indigo
  { suit: "#0891b2", skin: "#fcd34d", shoe: "#155e75" },   // Cyan
  { suit: "#7c3aed", skin: "#fbbf24", shoe: "#4c1d95" },   // Violet
  { suit: "#059669", skin: "#fcd34d", shoe: "#064e3b" },   // Emerald
];

export function WalkerSprite({
  id,
  size = 48,
  direction = "right",
}: {
  id: number;
  size?: number;
  direction?: "left" | "right";
}) {
  const c = COLORS[id % COLORS.length];
  const s = size / 48;

  return (
    <svg
      width={size}
      height={size * 1.35}
      viewBox="0 0 48 65"
      fill="none"
      className="drop-shadow-md"
      style={{
        transform: direction === "left" ? "scaleX(-1)" : undefined,
        transition: "transform 0.3s ease",
      }}
      aria-hidden="true"
    >
      {/* Legs — subtle walking pose: one leg forward */}
      <rect x="16" y="36" width="6" height="16" rx="3" fill={c.shoe} />
      <rect x="26" y="36" width="6" height="16" rx="3" fill={c.shoe} />
      {/* Body — suit */}
      <rect x="12" y="18" width="24" height="20" rx="6" fill={c.suit} />
      {/* Tie */}
      <polygon points="24,22 26,30 24,34 22,30" fill={c.shoe} opacity="0.4" />
      {/* Arms */}
      <rect x="4" y="20" width="7" height="14" rx="3.5" fill={c.suit} />
      <rect x="37" y="20" width="7" height="14" rx="3.5" fill={c.suit} />
      {/* Collar */}
      <polygon points="20,19 24,23 28,19" fill="white" opacity="0.3" />
      {/* Head */}
      <circle cx="24" cy="9" r="8" fill={c.skin} />
      {/* Eyes */}
      <circle cx="21" cy="8" r="1.5" fill={c.shoe} />
      <circle cx="27" cy="8" r="1.5" fill={c.shoe} />
      {/* Hair */}
      <path d="M17 5 Q24 0 31 5" fill={c.shoe} opacity="0.6" />
      {/* Glasses */}
      <rect x="18" y="6.5" width="6" height="3.5" rx="1.5" fill="none" stroke={c.shoe} strokeWidth="0.8" opacity="0.7" />
      <rect x="24" y="6.5" width="6" height="3.5" rx="1.5" fill="none" stroke={c.shoe} strokeWidth="0.8" opacity="0.7" />
      <line x1="24" y1="8" x2="24" y2="8.5" stroke={c.shoe} strokeWidth="0.6" opacity="0.7" />
    </svg>
  );
}
