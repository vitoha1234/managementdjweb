/**
 * VCTR DJ Management — Google Sheets CRM Webhook
 * ------------------------------------------------
 * Cara pakai:
 * 1. Buka https://sheets.google.com, buat spreadsheet baru bernama "VCTR Booking CRM".
 * 2. Di baris pertama (header), isi kolom persis seperti ini:
 *    Timestamp | Nama | Instansi | No WhatsApp | Tanggal Acara | Durasi | Jenis Pesanan | Item | Pesan
 * 3. Buka menu Extensions > Apps Script.
 * 4. Hapus kode default, tempel seluruh isi file ini, lalu Save.
 * 5. Klik Deploy > New deployment.
 *    - Type: Web app
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 6. Klik Deploy, salin "Web app URL" yang muncul.
 * 7. Tempelkan URL itu sebagai GOOGLE_SHEETS_WEBHOOK_URL di file .env project Next.js.
 */

function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);

    sheet.appendRow([
      data.submittedAt || new Date().toISOString(),
      data.name || "",
      data.org || "",
      data.phone || "",
      data.eventDate || "",
      data.duration || "",
      data.orderType === "dj" ? "Booking DJ" : "Rental Alat",
      data.item || "",
      data.message || "",
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet() {
  return ContentService
    .createTextOutput(JSON.stringify({ ok: true, message: "VCTR booking webhook aktif." }))
    .setMimeType(ContentService.MimeType.JSON);
}
