import BookingForm from "@/components/BookingForm";
import { Badge } from "@/components/ui";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Booking | VCTR DJ Management",
  description: "Ajukan booking DJ atau rental alat — otomatis terkirim via WhatsApp.",
};

type Props = {
  searchParams: Promise<{ type?: string; item?: string }>;
};

export default async function BookingPage({ searchParams }: Props) {
  const params = await searchParams;
  const initialType = params.type === "equipment" ? "equipment" : "dj";
  const initialItem = params.item ?? "";

  return (
    <div className="max-w-2xl mx-auto px-5 py-14">
      <Badge color="#FF2E88">SISTEM BOOKING</Badge>
      <h1 className="font-display font-bold text-[clamp(24px,4vw,32px)] mt-3.5 mb-6">
        Ajukan Booking
      </h1>
      <BookingForm initialType={initialType} initialItem={initialItem} />
    </div>
  );
}
