# Arsip PELINDO - Sistem Pengelolaan Arsip Surat

Aplikasi web untuk pengelolaan arsip surat PT. Pelabuhan Indonesia (Persero) Multi Terminal.

## Link Akses

🌐 **Spreadsheet Data Arsip:**
https://docs.google.com/spreadsheets/d/1AOgdjj8-HXFIYpbq5wozePv0OjZF65xae-_qaAVeVok/edit?hl=id&gid=1027813244#gid=1027813244

## Struktur File

```
Arsip Pelindo/
├── index.html          # Halaman Form Entry Arsip
├── tabel-arsip.html    # Halaman Tabel Data Arsip
├── dashboard.html      # Halaman Dashboard & Analitik
├── style.css           # Styling CSS utama
├── script.js           # JavaScript untuk Form Entry
├── tabel-arsip.js      # JavaScript untuk Tabel Arsip
├── dashboard.js        # JavaScript untuk Dashboard
├── Code.gs            # Google Apps Script (Backend)
├── README.md          # Dokumentasi ini
└── assets/            # Folder untuk gambar/logo
    ├── Logo_Danantara.png
    ├── Logo_BUMN.png
    └── Logo_PLMT_c.png
```

## Fitur & Keunggulan

### 1. Form Entry Arsip
- Input data arsip surat lengkap
- Dropdown klasifikasi berdasarkan standar Pelindo
- Auto-fill tanggal dan tahun
- Validasi real-time
- Notifikasi sukses/error

### 2. Tabel Arsip
- Tampilkan data dari Spreadsheet
- Filter berdasarkan Tahun, Klasifikasi, Retensi
- Pencarian data
- Pagination
- Refresh data otomatis

### 3. Dashboard & Analitik
- Total Arsip
- Statistik Retensi (Aktif/Inaktif)
- Arsip Tahun Ini
- Grafik Arsip per Tahun
- Grafik Arsip per Klasifikasi
- Tabel Arsip Terbaru

### 4. Keunggulan
- Desain responsif (mobile-friendly)
- UI/UX profesional
- Navbar terpisah dari header
- Menu centered dengan indikator aktif
- Integrasi Google Spreadsheet
- Auto-refresh data
- Support multiple user

## Cara Penggunaan

### 1. Setup Google Apps Script
1. Buka https://script.google.com/
2. Buat proyek baru
3. Copy kode dari `Code.gs`
4. Deploy sebagai Web App:
   - Type: Web App
   - Execute as: Me
   - Who has access: Anyone
5. Copy URL deployment

### 2. Konfigurasi
Update URL di file JavaScript:
- `script.js` - untuk form entry
- `tabel-arsip.js` - untuk tabel
- `dashboard.js` - untuk dashboard

```
javascript
const GAS_WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbwXa5Umo9ScVR90wQTKHoUHAJYCrHTinMa7CJp2kbJykPp3bqQaTl3sZ_yPkntsBW2UcA/exec';
const API_CONFIG = {
    baseUrl: 'https://script.google.com/macros/s/AKfycbwXa5Umo9ScVR90wQTKHoUHAJYCrHTinMa7CJp2kbJykPp3bqQaTl3sZ_yPkntsBW2UcA/exec',
    sheetName: 'Arsip Surat'
};
```

### 3. Penggunaan
1. Buka `index.html` untuk input arsip
2. Buka `tabel-arsip.html` untuk melihat data
3. Buka `dashboard.html` untuk melihat analitik

## Klasifikasi Arsip

Sistem menggunakan klasifikasi standar Pelindo:
- PR: Penelitian/Perencanaan/TI
- US: Usaha/Operasional Pelabuhan
- PP: Properti/Pembangunan
- KP: Kepegawaian
- HK: Hukum
- HI: Hubungan Internasional
- PM: Pengamanan
- UM: Umum/Tata Usaha
- KU: Keuangan
- HM: Humas
- PS: Pengawasan

## Teknologi

- HTML5 & CSS3
- JavaScript (Vanilla)
- Google Apps Script
- Google Spreadsheet

## Lisensi

Copyright © PT. Pelabuhan Indonesia (Pers ero) Multi Terminal
