import { Radio } from "lucide-react";
import { Badge, NeonButton } from "@/components/ui";
import { EQUIPMENT, fmtIDR } from "@/lib/data";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Rental Alat DJ | VCTR DJ Management",
  description: "Katalog rental CDJ, mixer, controller, sound system, dan lighting profesional.",
};

export default function RentalPage() {
  return (
    <div className="max-w-6xl mx-auto px-5 py-14">
      <Badge color="#22F0D8">SOUND · LIGHTING · DJ GEAR</Badge>
      <h1 className="font-display font-bold text-[clamp(26px,4vw,38px)] mt-3.5 mb-2.5">
        Rental Alat DJ
      </h1>
      <p className="text-sm text-muted mb-8 max-w-lg">
        Peralatan kelas profesional, terawat dan siap pakai — untuk klub, festival, atau acara
        privat.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {EQUIPMENT.map((eq) => (
          <div key={eq.id} className="bg-surface border border-line rounded-2xl overflow-hidden">
            <div className="h-28 flex items-center justify-center bg-gradient-to-br from-[#22F0D822] to-[#8B5CF622]">
              <Radio size={36} className="text-cyan" strokeWidth={1.3} />
            </div>
            <div className="p-4">
              <Badge color="#22F0D8">{eq.category}</Badge>
              <div className="font-display font-bold text-[15px] mt-2.5 mb-1">{eq.name}</div>
              <div className="text-[12.5px] text-muted leading-relaxed mb-3">{eq.spec}</div>
              <div className="flex items-baseline gap-1 mb-3.5">
                <span className="font-display font-bold text-lg text-cyan">
                  {fmtIDR(eq.price)}
                </span>
                <span className="font-data text-[11px] text-muted">/ hari · {eq.qty}</span>
              </div>
              <NeonButton
                href={`/booking?type=equipment&item=${encodeURIComponent(eq.name)}`}
                color="#22F0D8"
                full
              >
                Rent This Item
              </NeonButton>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
