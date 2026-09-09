# Cara Membuat Link yang Bisa Dibagikan

## 1. Buat Google Sheet
Buat spreadsheet baru, misalnya:
`Nilai Tugas ASJ Jaringan`

Buat sheet bernama `Nilai`.

Kolom akan dibuat otomatis oleh Apps Script.

## 2. Pasang backend
Buka:
Google Drive → Baru → Lainnya → Google Apps Script.

Salin isi `Code.gs` ke project Apps Script.

Jalankan fungsi `setupSheet` sekali dan izinkan akses.

## 3. Deploy sebagai Web App
Di Apps Script:
Deploy → New deployment → Web app

Pengaturan:
- Execute as: Me
- Who has access: Anyone

Salin URL Web App.

## 4. Hubungkan frontend
Buka `app.js`, cari:
`const API_URL = "";`

Ganti menjadi URL Web App Apps Script, contoh:
`const API_URL = "https://script.google.com/macros/s/XXXXX/exec";`

## 5. Bagikan halaman siswa
Upload folder ini ke hosting statis seperti GitHub Pages, Netlify, atau hosting sekolah.

Halaman siswa:
`index.html`

Halaman guru:
`guru.html`

Dashboard guru membaca data nilai dari Google Sheets melalui Apps Script.

## 6. Kunci dashboard guru
Di `guru.html`, ubah:
`const TEACHER_PIN = "1234";`

menjadi PIN Anda sendiri.

## Skema nilai
- Pilihan ganda: 6 soal × 10 = 60
- Studi kasus: 2 soal × 20 = 40
- Total = 100

Studi kasus dinilai berdasarkan kata kunci. Guru tetap dapat melakukan pengecekan manual dari jawaban siswa.
