"use client";

import React, { useMemo, useState } from "react";
import { Check, ChevronLeft, ChevronRight, MessageCircle, Zap } from "lucide-react";
import { NeonButton } from "./ui";
import { DJS, EQUIPMENT, DURATIONS, WA_NUMBER } from "@/lib/data";

type OrderType = "dj" | "equipment";

type FormState = {
  name: string;
  org: string;
  phone: string;
  eventDate: string;
  duration: string;
  orderType: OrderType;
  item: string;
  message: string;
};

const inputClass =
  "w-full bg-raised border border-line rounded-lg px-3.5 py-2.5 text-ink text-sm outline-none focus:border-pink transition-colors";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-xs text-muted">{label}</span>
      {children}
    </label>
  );
}

const STEPS = ["Data Diri", "Jadwal", "Pesanan", "Konfirmasi"];

export default function BookingForm({
  initialType,
  initialItem,
}: {
  initialType: OrderType;
  initialItem: string;
}) {
  const [step, setStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const [form, setForm] = useState<FormState>({
    name: "",
    org: "",
    phone: "",
    eventDate: "",
    duration: DURATIONS[0],
    orderType: initialType,
    item: initialItem,
    message: "",
  });

  const set =
    (k: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
      setForm({ ...form, [k]: e.target.value });

  const itemOptions = form.orderType === "dj" ? DJS.map((d) => d.name) : EQUIPMENT.map((e) => e.name);

  const waMessage = useMemo(() => {
    const jenis = form.orderType === "dj" ? "Booking DJ" : "Rental Alat";
    return [
      `Halo VCTR DJ Management, saya ingin melakukan *${jenis}*.`,
      ``,
      `Nama: ${form.name || "-"}`,
      `Instansi/Klub: ${form.org || "-"}`,
      `No. WhatsApp: ${form.phone || "-"}`,
      `Tanggal Acara: ${form.eventDate || "-"}`,
      `Durasi/Paket: ${form.duration}`,
      `${form.orderType === "dj" ? "Nama DJ" : "Alat"}: ${form.item || "-"}`,
      `Pesan Tambahan: ${form.message || "-"}`,
      ``,
      `Mohon info ketersediaan & harga. Terima kasih!`,
    ].join("\n");
  }, [form]);

  const canNext = () => {
    if (step === 1) return Boolean(form.name && form.phone);
    if (step === 2) return Boolean(form.eventDate);
    if (step === 3) return Boolean(form.item);
    return true;
  };

  const handleSubmit = async () => {
    setSending(true);
    setSubmitError(null);

    // Kirim ke API route internal (/api/booking), yang secara server-side
    // meneruskan data ke Google Sheets webhook (lihat app/api/booking/route.ts).
    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!data.ok) {
        setSubmitError(data.error ?? "Gagal menyimpan ke CRM, tapi permintaan tetap dikirim via WhatsApp.");
      }
    } catch {
      setSubmitError("Tidak bisa menghubungi server CRM — permintaan tetap dikirim via WhatsApp.");
    }

    setSending(false);
    setSubmitted(true);
    const waUrl = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(waMessage)}`;
    window.open(waUrl, "_blank");
  };

  if (submitted) {
    return (
      <div className="text-center py-10">
        <div className="w-16 h-16 rounded-full bg-[#FF2E8822] flex items-center justify-center mx-auto mb-5">
          <Check size={28} className="text-pink" />
        </div>
        <h2 className="font-display font-bold text-xl">Permintaan Terkirim!</h2>
        <p className="text-sm text-muted mt-2.5 leading-relaxed max-w-sm mx-auto">
          Tab WhatsApp seharusnya sudah terbuka dengan pesan yang telah terisi otomatis. Data juga
          diteruskan ke sistem CRM kami untuk ditindaklanjuti tim booking.
        </p>
        {submitError && (
          <p className="text-xs text-[#FFB020] mt-3 max-w-sm mx-auto">⚠ {submitError}</p>
        )}
        <button
          onClick={() => {
            setSubmitted(false);
            setStep(1);
          }}
          className="mt-6 border border-line rounded-lg px-4.5 py-2.5 text-muted text-[13px] hover:text-ink transition-colors"
        >
          Buat permintaan baru
        </button>
      </div>
    );
  }

  return (
    <div>
      {/* stepper */}
      <div className="flex items-center mb-8">
        {STEPS.map((s, i) => {
          const n = i + 1;
          const active = step === n;
          const done = step > n;
          return (
            <React.Fragment key={s}>
              <div className="flex flex-col items-center gap-1.5 min-w-15">
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center font-data text-xs font-bold border ${
                    done
                      ? "bg-pink border-pink text-void"
                      : active
                      ? "border-pink text-pink"
                      : "border-line text-[#4E4D5E] bg-raised"
                  }`}
                >
                  {done ? <Check size={13} /> : n}
                </div>
                <span
                  className={`text-[10.5px] text-center ${active ? "text-ink" : "text-[#4E4D5E]"}`}
                >
                  {s}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div
                  className={`flex-1 h-[1.5px] mb-4.5 ${step > n ? "bg-pink" : "bg-line"}`}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>

      <div className="bg-surface border border-line rounded-2xl p-6">
        {step === 1 && (
          <div className="flex flex-col gap-3.5">
            <Field label="Nama Lengkap">
              <input className={inputClass} value={form.name} onChange={set("name")} placeholder="Nama Anda" />
            </Field>
            <Field label="Instansi / Klub / Nama Acara">
              <input
                className={inputClass}
                value={form.org}
                onChange={set("org")}
                placeholder="cth. Skyline Club / PT Nama Perusahaan"
              />
            </Field>
            <Field label="No. WhatsApp">
              <input className={inputClass} value={form.phone} onChange={set("phone")} placeholder="08xx-xxxx-xxxx" />
            </Field>
          </div>
        )}

        {step === 2 && (
          <div className="flex flex-col gap-3.5">
            <Field label="Tanggal Acara">
              <input type="date" className={inputClass} value={form.eventDate} onChange={set("eventDate")} />
            </Field>
            <Field label="Durasi / Paket">
              <select className={inputClass} value={form.duration} onChange={set("duration")}>
                {DURATIONS.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </Field>
          </div>
        )}

        {step === 3 && (
          <div className="flex flex-col gap-3.5">
            <Field label="Jenis Pesanan">
              <div className="flex gap-2.5">
                {(
                  [
                    ["dj", "Booking DJ"],
                    ["equipment", "Rental Alat"],
                  ] as [OrderType, string][]
                ).map(([val, label]) => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => setForm({ ...form, orderType: val, item: "" })}
                    className={`flex-1 px-3 py-2.5 rounded-lg text-[13px] font-medium border transition-colors ${
                      form.orderType === val
                        ? "bg-[#FF2E8822] border-pink text-pink"
                        : "bg-raised border-line text-muted"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </Field>
            <Field label={form.orderType === "dj" ? "Pilih DJ" : "Pilih Alat"}>
              <select className={inputClass} value={form.item} onChange={set("item")}>
                <option value="">— pilih —</option>
                {itemOptions.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>
            </Field>
          </div>
        )}

        {step === 4 && (
          <div className="flex flex-col gap-3.5">
            <Field label="Pesan Tambahan (opsional)">
              <textarea
                className={`${inputClass} min-h-20 resize-y`}
                value={form.message}
                onChange={set("message")}
                placeholder="Genre spesifik, request lagu, kebutuhan teknis, dsb."
              />
            </Field>
            <div className="bg-raised rounded-lg p-3.5 font-data text-[11.5px] text-muted whitespace-pre-wrap leading-relaxed">
              {waMessage}
            </div>
          </div>
        )}

        <div className="flex justify-between mt-6">
          {step > 1 ? (
            <NeonButton variant="outline" color="#8D8CA3" onClick={() => setStep(step - 1)}>
              <ChevronLeft size={15} /> Kembali
            </NeonButton>
          ) : (
            <div />
          )}
          {step < 4 ? (
            <NeonButton color="#FF2E88" onClick={() => canNext() && setStep(step + 1)}>
              Lanjut <ChevronRight size={15} />
            </NeonButton>
          ) : (
            <NeonButton color="#FF2E88" onClick={handleSubmit} disabled={sending}>
              {sending ? "Mengirim..." : (
                <>
                  Kirim via WhatsApp <MessageCircle size={15} />
                </>
              )}
            </NeonButton>
          )}
        </div>
      </div>

      <div className="font-data text-[10.5px] text-[#4E4D5E] mt-3 flex items-center gap-1.5">
        <Zap size={11} /> Data juga tersimpan otomatis ke CRM (Google Sheets) via API route internal.
      </div>
    </div>
  );
}
