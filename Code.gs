/**
 * Google Apps Script untuk Form Entry Arsip Surat Pelindo
 * 
 * Cara Setup:
 * 1. Buka https://script.google.com/
 * 2. Buat proyek baru
 * 3. Copy kode ini ke Code.gs
 * 4. Deploy sebagai Web App
 * 5. Copy URL deployment ke tabel-arsip.js
 */

// ID Spreadsheet
const SPREADSHEET_ID = '1AOgdjj8-HXFIYpbq5wozePv0OjZF65xae-_qaAVeVok';

// Nama sheet tempat data disimpan
const SHEET_NAME = 'Arsip Surat';

/**
 * Fungsi untuk menangani request POST dari form
 */
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    
    if (!data || Object.keys(data).length === 0) {
      return ContentService
        .createTextOutput(JSON.stringify({ success: false, message: 'Data tidak valid' }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    const result = appendToSheet(data);
    
    return ContentService
      .createTextOutput(JSON.stringify({ success: true, message: 'Data berhasil disimpan', row: result }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, message: 'Error: ' + error.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Fungsi untuk menangani request GET
 */
function doGet(e) {
  try {
    const action = e.parameter.action;
    
    if (action === 'getData') {
      const data = getAllData();
      return ContentService
        .createTextOutput(JSON.stringify(data))
        .setMimeType(ContentService.MimeType.JSON);
    }
    
    // Default response
    return ContentService
      .createTextOutput(JSON.stringify({ success: true, message: 'Apps Script berjalan!', timestamp: new Date().toISOString() }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, message: 'Error: ' + error.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Fungsi untuk menambahkan data ke spreadsheet
 */
function appendToSheet(data) {
  const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
  
  let sheet = spreadsheet.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = spreadsheet.insertSheet(SHEET_NAME);
    
    const headers = [
      'TANGGAL ENTRY', 'KOPEL', 'KODE UNIT', 'INDEKS', 'NOMOR BERKAS',
      'JUDUL BERKAS', 'NOMOR ISI BERKAS', 'JENIS NASKAH DINAS', 'KLASIFIKASI',
      'NOMOR SURAT', 'TANGGAL', 'TAHUN', 'PERIHAL', 'TINGKAT PERKEMBANGAN',
      'KONDISI', 'LOKASI SIMPAN', 'LABEL', 'RETENSI AKTIF/INAKTIF', 'KETERANGAN', 'WAKTU ENTRI'
    ];
    
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold');
    sheet.getRange(1, 1, 1, headers.length).setBackground('#1e3c72');
    sheet.getRange(1, 1, 1, headers.length).setFontColor('white');
  }
  
  const rowData = [
    data.tanggalEntry || '',
    data.kopel || '',
    data.kodeUnit || '',
    data.indeks || '',
    data.nomorBerkas || '',
    data.judulBerkas || '',
    data.nomorIsiBerkas || '',
    data.jenisNaskahDinas || '',
    data.klasifikasi || '',
    data.nomorSurat || '',
    data.tanggalSurat || '',
    data.tahun || '',
    data.perihal || '',
    data.tingkatPerkembangan || '',
    data.kondisi || '',
    data.lokasiSimpan || '',
    data.label || '',
    data.retensi || '',
    data.keterangan || '',
    new Date().toLocaleString('id-ID')
  ];
  
  const lastRow = sheet.getLastRow();
  sheet.getRange(lastRow + 1, 1, 1, rowData.length).setValues([rowData]);
  sheet.autoResizeColumns(1, rowData.length);
  
  return lastRow + 1;
}

/**
 * Fungsi untuk mendapatkan semua data arsip
 */
function getAllData() {
  const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = spreadsheet.getSheetByName(SHEET_NAME);
  
  if (!sheet) {
    return [];
  }
  
  const lastRow = sheet.getLastRow();
  const lastColumn = sheet.getLastColumn();
  
  if (lastRow <= 1) {
    return [];
  }
  
  const headers = sheet.getRange(1, 1, 1, lastColumn).getValues()[0];
  const data = sheet.getRange(2, 1, lastRow - 1, lastColumn).getValues();
  
  const result = data.map((row, index) => {
    const obj = {};
    headers.forEach((header, i) => {
      const key = header.toLowerCase().replace(/[\s\/]/g, '');
      obj[key] = row[i];
    });
    obj.id = index + 1;
    return obj;
  });
  
  return result;
}

/**
 * Fungsi untuk menghapus data
 */
function deleteRow(rowNumber) {
  const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = spreadsheet.getSheetByName(SHEET_NAME);
  
  if (!sheet) {
    return false;
  }
  
  sheet.deleteRow(rowNumber);
  return true;
}

/**
 * Menu kustom di Google Sheets
 */
function onOpen() {
  const ui = SpreadsheetApp.getUi();
  ui.createMenu('Arsip Surat')
    .addItem('Refresh Data', 'refreshData')
    .addItem('Export ke CSV', 'exportToCSV')
    .addToUi();
}

function refreshData() {
  SpreadsheetApp.getActiveSpreadsheet().toast('Data telah direfresh!');
}

function exportToCSV() {
  const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
  const sheet = spreadsheet.getSheetByName(SHEET_NAME);
  
  if (!sheet) {
    SpreadsheetApp.getActiveSpreadsheet().alert('Sheet tidak ditemukan!');
    return;
  }
  
  const data = sheet.getDataRange().getValues();
  const csv = data.map(row => row.join(',')).join('\n');
  
  const blob = Utilities.newBlob(csv, 'text/csv', 'Arsip_Surat_' + new Date().toISOString() + '.csv');
  
  SpreadsheetApp.getActiveSpreadsheet().toast('File CSV telah dibuat!');
}
