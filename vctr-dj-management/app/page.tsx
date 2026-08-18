import { Disc3, Radio, ArrowRight, Sparkles } from "lucide-react";
import { Badge, NeonButton, EqBars } from "@/components/ui";
import { PORTFOLIO } from "@/lib/data";

export default function HomePage() {
  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden px-5 pt-24 pb-20 text-center">
        <div
          className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full blur-md"
          style={{ background: "radial-gradient(circle, #FF2E8833 0%, transparent 65%)" }}
        />
        <div
          className="pointer-events-none absolute top-16 left-[20%] w-[400px] h-[400px] rounded-full blur-2xl"
          style={{ background: "radial-gradient(circle, #22F0D822 0%, transparent 70%)" }}
        />
        <div className="relative max-w-2xl mx-auto">
          <div className="flex justify-center mb-6">
            <EqBars color="#FF2E88" count={30} h={22} />
          </div>
          <Badge color="#22F0D8">DJ MANAGEMENT · EQUIPMENT RENTAL</Badge>
          <h1 className="font-display font-extrabold tracking-tight text-[clamp(34px,6vw,64px)] leading-[1.08] mt-5 mb-4">
            Nyalakan Setiap
            <br />
            <span className="text-pink">Lantai Dansa.</span>
          </h1>
          <p className="text-muted text-base max-w-lg mx-auto mb-8 leading-relaxed">
            VCTR menghubungkan Anda dengan DJ profesional dan peralatan sound & lighting kelas
            festival — siap untuk klub, pernikahan, hingga event korporat.
          </p>
          <div className="flex gap-3 justify-center flex-wrap">
            <NeonButton href="/roster" color="#FF2E88">
              <Disc3 size={16} /> Book a DJ
            </NeonButton>
            <NeonButton href="/rental" color="#22F0D8" variant="outline">
              <Radio size={16} /> Rent Equipment
            </NeonButton>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="max-w-6xl mx-auto px-5 py-16 grid grid-cols-1 md:grid-cols-[1.1fr_0.9fr] gap-9 items-center">
        <div>
          <Badge color="#8B5CF6">TENTANG KAMI</Badge>
          <h2 className="font-display font-bold text-[30px] leading-[1.25] mt-3.5 mb-4">
            Dari booth DJ hingga sound system —
            <br />
            kami urus semuanya.
          </h2>
          <p className="text-[14.5px] text-muted leading-[1.75] max-w-xl">
            VCTR DJ Management berdiri untuk menjembatani talenta DJ terbaik dengan penyelenggara
            acara, sekaligus menyediakan peralatan audio-visual profesional agar setiap acara
            berjalan tanpa kompromi kualitas. Visi kami: menjadi mitra produksi musik live nomor
            satu untuk industri nightlife dan event di Indonesia.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-3.5">
          {[
            { k: "150+", v: "Acara Ditangani", c: "#FF2E88" },
            { k: "12", v: "DJ Profesional", c: "#8B5CF6" },
            { k: "40+", v: "Unit Peralatan", c: "#22F0D8" },
            { k: "9", v: "Kota di Indonesia", c: "#FF2E88" },
          ].map((s) => (
            <div key={s.v} className="bg-surface border border-line rounded-xl px-4 py-5">
              <div className="font-display font-extrabold text-[28px]" style={{ color: s.c }}>
                {s.k}
              </div>
              <div className="text-[12.5px] text-muted mt-1">{s.v}</div>
            </div>
          ))}
        </div>
      </section>

      {/* PORTFOLIO */}
      <section className="max-w-6xl mx-auto px-5 pt-10 pb-16">
        <Badge color="#FF2E88">KLIEN & PORTOFOLIO KAMI</Badge>
        <h2 className="font-display font-bold text-[26px] mt-3.5 mb-6">
          Momen yang pernah kami nyalakan
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {PORTFOLIO.map((p) => (
            <div
              key={p.title}
              className="rounded-2xl p-px"
              style={{ background: `linear-gradient(135deg, ${p.from}, ${p.to})` }}
            >
              <div className="relative bg-[#0D0D14] rounded-[15px] p-5 h-40 flex flex-col justify-end overflow-hidden">
                <div
                  className="absolute inset-0 opacity-20"
                  style={{ background: `linear-gradient(135deg, ${p.from}, ${p.to})` }}
                />
                <Sparkles size={18} className="absolute top-4 right-4 opacity-50 text-ink" />
                <div className="relative">
                  <div className="font-display font-bold text-[15.5px]">{p.title}</div>
                  <div className="font-data text-[11px] text-[#B8B7C9] mt-1">{p.tag}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA STRIP */}
      <section className="bg-gradient-to-r from-[#1B0E17] to-[#12101E] border-t border-b border-line px-5 py-11">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-5 flex-wrap">
          <div>
            <div className="font-display font-bold text-xl">Siap menyalakan acara Anda?</div>
            <div className="text-[13.5px] text-muted mt-1">
              Booking DJ atau alat dalam hitungan menit, langsung via WhatsApp.
            </div>
          </div>
          <NeonButton href="/booking" color="#FF2E88">
            Mulai Booking <ArrowRight size={15} />
          </NeonButton>
        </div>
      </section>
    </div>
  );
}
