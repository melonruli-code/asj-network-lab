# Platform Tugas ASJ — Simulasi Jaringan

Platform tugas interaktif untuk siswa TKJ/TJKT dengan:
- Identitas siswa
- Materi/studi kasus jaringan
- Soal pilihan ganda dan studi kasus
- Penilaian otomatis
- Dashboard guru untuk melihat nilai
- Penyimpanan nilai ke Google Sheets melalui Google Apps Script
- Bisa dibagikan melalui link setelah deployment

## Struktur
- `index.html` — halaman siswa
- `guru.html` — dashboard guru
- `style.css` — tampilan interaktif
- `app.js` — logika soal, timer, penilaian, dan pengiriman data
- `Code.gs` — backend Google Apps Script
- `SETUP.md` — panduan pemasangan

## Catatan
Versi ini dibuat agar mudah dipasang tanpa server VPS. Backend memakai Google Apps Script + Google Sheets.
