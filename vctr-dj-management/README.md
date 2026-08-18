# VCTR DJ Management

Web app manajemen bisnis DJ & rental alat — Next.js (App Router) + TypeScript + Tailwind CSS v4.

## Fitur
- Landing page (hero, tentang kami, portofolio)
- DJ Roster + halaman detail per DJ (embed demo mix SoundCloud)
- Katalog rental alat DJ
- Formulir booking multi-step → redirect WhatsApp otomatis + kirim ke Google Sheets (CRM)
- 100% responsif, tema dark nightlife/EDM dengan aksen neon

## Menjalankan secara lokal

```bash
npm install
npm run dev
```

Buka http://localhost:3000

## Menghubungkan ke Google Sheets (CRM)

1. Ikuti instruksi lengkap di `google-apps-script.gs`.
2. Salin `.env.example` menjadi `.env.local`, isi `GOOGLE_SHEETS_WEBHOOK_URL` dengan Web App URL dari Apps Script.
3. Restart `npm run dev`. Setiap submit booking sekarang akan menulis baris baru ke Spreadsheet.

Tanpa langkah ini, form tetap berfungsi (redirect ke WhatsApp tetap jalan), hanya bagian penyimpanan ke CRM yang dilewati.

## Konfigurasi lain

- Ganti nomor WhatsApp bisnis di `lib/data.ts` → `WA_NUMBER`.
- Ganti data DJ, alat, dan portofolio di file yang sama.
- Ganti embed demo mix (`dj.track`) dengan URL SoundCloud/Spotify asli per DJ.

## Deploy

Paling mudah lewat [Vercel](https://vercel.com):

```bash
npx vercel
```

Jangan lupa set environment variable `GOOGLE_SHEETS_WEBHOOK_URL` di dashboard Vercel (Settings > Environment Variables) sebelum deploy production.
