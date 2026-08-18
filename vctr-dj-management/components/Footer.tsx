import Link from "next/link";
import { Camera, Video, Music2 } from "lucide-react";
import { WA_NUMBER } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="border-t border-line mt-16 px-5 pt-10 pb-7 bg-[#0A0A11]">
      <div className="max-w-6xl mx-auto flex flex-wrap gap-8 justify-between">
        <div className="max-w-[280px]">
          <div className="font-display font-bold text-lg mb-2">
            VCTR<span className="text-pink">.</span>
          </div>
          <p className="text-[13px] text-muted leading-relaxed">
            Manajemen DJ & penyewaan alat profesional untuk klub, festival, dan acara privat di
            seluruh Indonesia.
          </p>
        </div>

        <div>
          <div className="font-data text-[11px] text-cyan tracking-wide uppercase mb-2.5">
            Navigasi
          </div>
          <div className="flex flex-col gap-2 text-[13.5px] text-muted">
            <Link href="/" className="hover:text-ink transition-colors">Beranda</Link>
            <Link href="/roster" className="hover:text-ink transition-colors">DJ Roster</Link>
            <Link href="/rental" className="hover:text-ink transition-colors">Rental Alat</Link>
            <Link href="/booking" className="hover:text-ink transition-colors">Booking</Link>
          </div>
        </div>

        <div>
          <div className="font-data text-[11px] text-cyan tracking-wide uppercase mb-2.5">
            Kontak
          </div>
          <div className="flex flex-col gap-2 text-[13.5px] text-muted">
            <span>WhatsApp: +{WA_NUMBER}</span>
            <span>Email: booking@vctrdj.id</span>
            <span>Jakarta, Indonesia</span>
          </div>
        </div>

        <div>
          <div className="font-data text-[11px] text-cyan tracking-wide uppercase mb-2.5">
            Sosial Media
          </div>
          <div className="flex gap-2.5">
            {[
              { Icon: Camera, label: "Instagram", href: "https://instagram.com/vctrdj" },
              { Icon: Video, label: "YouTube", href: "https://youtube.com/@vctrdj" },
              { Icon: Music2, label: "TikTok", href: "https://tiktok.com/@vctrdj" },
            ].map(({ Icon, label, href }) => (
              <Link
                key={label}
                href={href}
                title={label}
                aria-label={label}
                className="w-[34px] h-[34px] rounded-lg border border-line flex items-center justify-center text-muted hover:text-pink hover:border-pink transition-colors"
              >
                <Icon size={15} />
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-7 pt-[18px] border-t border-line font-data text-[11px] text-[#4E4D5E]">
        © {new Date().getFullYear()} VCTR DJ Management. Semua hak dilindungi.
      </div>
    </footer>
  );
}
