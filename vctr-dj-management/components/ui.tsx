import Link from "next/link";
import type { ReactNode } from "react";

export function EqBars({
  color = "#FF2E88",
  count = 24,
  h = 16,
}: {
  color?: string;
  count?: number;
  h?: number;
}) {
  return (
    <div className="flex items-end gap-[2.5px]" style={{ height: h }}>
      {Array.from({ length: count }).map((_, i) => (
        <span
          key={i}
          className="w-[2px] rounded-sm animate-eq"
          style={{
            background: color,
            height: `${18 + Math.abs(Math.sin(i * 0.8)) * 82}%`,
            animationDelay: `${i * 0.05}s`,
          }}
        />
      ))}
    </div>
  );
}

export function Badge({
  children,
  color = "#FF2E88",
}: {
  children: ReactNode;
  color?: string;
}) {
  return (
    <span
      className="font-data text-[11px] tracking-wide rounded-full px-3 py-1 border whitespace-nowrap inline-block"
      style={{ color, borderColor: `${color}66`, background: `${color}14` }}
    >
      {children}
    </span>
  );
}

type NeonButtonProps = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  color?: string;
  variant?: "solid" | "outline";
  full?: boolean;
  type?: "button" | "submit";
  disabled?: boolean;
};

export function NeonButton({
  children,
  href,
  onClick,
  color = "#FF2E88",
  variant = "solid",
  full,
  type = "button",
  disabled,
}: NeonButtonProps) {
  const solid = variant === "solid";
  const className = [
    "font-display text-[13px] font-semibold px-5 py-3 rounded-xl",
    "inline-flex items-center justify-center gap-2 transition-transform hover:-translate-y-0.5",
    full ? "w-full" : "w-auto",
    disabled ? "opacity-50 pointer-events-none" : "",
  ].join(" ");
  const style = {
    background: solid ? color : "transparent",
    color: solid ? "#08080D" : color,
    border: `1.5px solid ${color}`,
    boxShadow: solid ? `0 0 24px ${color}55` : "none",
  };

  if (href) {
    return (
      <Link href={href} className={className} style={style}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={className} style={style}>
      {children}
    </button>
  );
}
