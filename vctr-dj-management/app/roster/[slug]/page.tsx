import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft, MapPin, Volume2, CalendarClock } from "lucide-react";
import { Badge, NeonButton } from "@/components/ui";
import { DJS } from "@/lib/data";
import type { Metadata } from "next";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return DJS.map((dj) => ({ slug: dj.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const dj = DJS.find((d) => d.id === slug);
  return {
    title: dj ? `${dj.name} | VCTR DJ Management` : "DJ Tidak Ditemukan",
    description: dj?.bio,
  };
}

export default async function DjDetailPage({ params }: Props) {
  const { slug } = await params;
  const dj = DJS.find((d) => d.id === slug);
  if (!dj) notFound();

  return (
    <div className="max-w-3xl mx-auto px-5 py-12">
      <Link
        href="/roster"
        className="text-muted hover:text-ink inline-flex items-center gap-1.5 text-[13px] mb-6"
      >
        <ChevronLeft size={15} /> Kembali ke Roster
      </Link>

      <div className="flex gap-6 flex-wrap items-start">
        <div className="w-40 h-40 rounded-2xl shrink-0 flex items-center justify-center bg-gradient-to-br from-[#8B5CF633] to-[#FF2E8833]">
          <span className="font-display font-extrabold text-5xl text-violet">
            {dj.name.split(" ").map((w) => w[0]).join("").slice(0, 2)}
          </span>
        </div>
        <div className="flex-1 min-w-60">
          <Badge color="#8B5CF6">{dj.genre}</Badge>
          <h1 className="font-display font-bold text-[clamp(26px,4vw,36px)] mt-3.5 mb-1.5">
            {dj.name}
          </h1>
          <div className="flex items-center gap-1.5 text-muted text-[13px] mb-4">
            <MapPin size={13} /> Berbasis di {dj.city}
          </div>
          <p className="text-[14.5px] text-[#B8B7C9] leading-[1.7] max-w-lg">{dj.bio}</p>
        </div>
      </div>

      <div className="mt-9">
        <div className="font-data text-[11px] text-cyan tracking-wide uppercase mb-2.5 flex items-center gap-1.5">
          <Volume2 size={13} /> Demo Mix
        </div>
        <div className="rounded-xl overflow-hidden border border-line">
          <iframe
            title={`Demo mix ${dj.name}`}
            width="100%"
            height="166"
            scrolling="no"
            frameBorder="no"
            src={`https://w.soundcloud.com/player/?url=${encodeURIComponent(
              dj.track
            )}&color=%23ff2e88&auto_play=false&show_comments=false`}
          />
        </div>
        <div className="font-data text-[10.5px] text-[#4E4D5E] mt-1.5">
          * Placeholder embed — ganti <code>dj.track</code> di lib/data.ts dengan URL SoundCloud/
          Spotify mix asli.
        </div>
      </div>

      <div className="mt-8">
        <NeonButton href={`/booking?type=dj&item=${encodeURIComponent(dj.name)}`} color="#FF2E88">
          <CalendarClock size={16} /> Book {dj.name}
        </NeonButton>
      </div>
    </div>
  );
}
