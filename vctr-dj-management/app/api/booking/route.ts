import { NextResponse } from "next/server";

/**
 * POST /api/booking
 *
 * Menerima data formulir booking dari client, lalu meneruskannya (server-side,
 * bebas masalah CORS) ke Google Apps Script Web App yang menulis baris baru
 * ke Google Sheets sebagai database CRM sederhana.
 *
 * Setup:
 * 1. Buat Google Sheet baru untuk mencatat booking.
 * 2. Ekstensi > Apps Script, tempel kode dari google-apps-script.gs (root project ini).
 * 3. Deploy > New deployment > Web app, akses "Anyone", copy URL yang dihasilkan.
 * 4. Simpan URL itu sebagai env var GOOGLE_SHEETS_WEBHOOK_URL (lihat .env.example).
 */
export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Body request tidak valid (harus JSON)." }, { status: 400 });
  }

  const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;

  if (!webhookUrl) {
    console.warn(
      "[api/booking] GOOGLE_SHEETS_WEBHOOK_URL belum diatur di .env — data booking diterima tapi TIDAK diteruskan ke Google Sheets."
    );
    return NextResponse.json({
      ok: true,
      warning:
        "GOOGLE_SHEETS_WEBHOOK_URL belum dikonfigurasi di server. Booking tetap diproses via WhatsApp, tapi belum tersimpan ke CRM.",
    });
  }

  try {
    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...body, submittedAt: new Date().toISOString() }),
    });

    if (!res.ok) {
      throw new Error(`Webhook merespons status ${res.status}`);
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[api/booking] Gagal mengirim data ke Google Sheets webhook:", err);
    return NextResponse.json(
      { ok: false, error: "Gagal menyimpan ke CRM. Data booking tetap terkirim via WhatsApp." },
      { status: 502 }
    );
  }
}
