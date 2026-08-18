import Link from "next/link";
import { MapPin, Disc3 } from "lucide-react";
import { Badge, EqBars } from "@/components/ui";
import { DJS } from "@/lib/data";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "DJ Roster | VCTR DJ Management",
  description: "Daftar DJ profesional VCTR — pilih spesialisasi genre yang cocok untuk acara Anda.",
};

export default function RosterPage() {
  return (
    <div className="max-w-6xl mx-auto px-5 py-14">
      <Badge color="#8B5CF6">TALENTA KAMI</Badge>
      <h1 className="font-display font-bold text-[clamp(26px,4vw,38px)] mt-3.5 mb-2.5">
        DJ Roster
      </h1>
      <p className="text-sm text-muted mb-8 max-w-lg">
        DJ profesional dengan spesialisasi genre berbeda — pilih yang paling cocok untuk vibe
        acara Anda.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {DJS.map((dj) => (
          <Link
            key={dj.id}
            href={`/roster/${dj.id}`}
            className="text-left bg-surface border border-line rounded-2xl overflow-hidden block hover:border-violet transition-colors"
          >
            <div className="h-[150px] relative flex items-center justify-center bg-gradient-to-br from-[#8B5CF622] to-[#FF2E8822]">
              <Disc3 size={44} className="text-violet" strokeWidth={1.3} />
              <div className="absolute bottom-2.5 left-3">
                <EqBars color="#8B5CF6" count={14} h={12} />
              </div>
            </div>
            <div className="p-4">
              <div className="font-display font-bold text-base">{dj.name}</div>
              <div className="font-data text-[11.5px] text-violet mt-1.5">{dj.genre}</div>
              <div className="flex items-center gap-1.5 mt-2 text-muted text-[12.5px]">
                <MapPin size={12} /> {dj.city}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
