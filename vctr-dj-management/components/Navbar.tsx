"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Disc3 } from "lucide-react";
import { NeonButton } from "./ui";

const LINKS = [
  { href: "/", label: "Beranda" },
  { href: "/roster", label: "DJ Roster" },
  { href: "/rental", label: "Rental Alat" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="sticky top-0 z-40 bg-void/85 backdrop-blur-md border-b border-line">
      <div className="max-w-6xl mx-auto px-5 py-3.5 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
          <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-pink to-violet flex items-center justify-center shrink-0">
            <Disc3 size={18} className="text-void" strokeWidth={2.5} />
          </span>
          <span className="font-display font-bold text-lg tracking-tight">
            VCTR<span className="text-pink">.</span>
          </span>
        </Link>

        <div className="hidden md:flex gap-7">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`text-sm font-medium transition-colors ${
                pathname === l.href ? "text-pink" : "text-muted hover:text-ink"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className="hidden md:block">
          <NeonButton href="/booking" color="#FF2E88">
            Book Now
          </NeonButton>
        </div>

        <button
          onClick={() => setOpen((v) => !v)}
          className="md:hidden text-ink"
          aria-label="Buka menu navigasi"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-line px-5 pb-5 pt-3 flex flex-col gap-3">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className={`text-[15px] font-medium py-1.5 ${
                pathname === l.href ? "text-pink" : "text-ink"
              }`}
            >
              {l.label}
            </Link>
          ))}
          <NeonButton href="/booking" color="#FF2E88" full>
            Book Now
          </NeonButton>
        </div>
      )}
    </div>
  );
}
