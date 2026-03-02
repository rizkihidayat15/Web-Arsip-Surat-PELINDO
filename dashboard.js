// Konfigurasi API - URL Apps Script
const API_CONFIG = {
    baseUrl: 'https://script.google.com/macros/s/AKfycbwXa5Umo9ScVR90wQTKHoUHAJYCrHTinMa7CJp2kbJykPp3bqQaTl3sZ_yPkntsBW2UcA/exec',
    sheetName: 'Arsip Surat'
};

// Data klasifikasi untuk display nama
const klasifikasiNames = {
    'PR.01': 'PENELITIAN',
    'PR.02': 'PERENCANAAN',
    'PR.03': 'TI',
    'PR.04': 'LAPORAN',
    'US.10': 'PEMASARAN',
    'US.11': 'TARIF',
    'US.12': 'BISNIS MARITIM',
    'US.13': 'TERMINAL KONV.',
    'US.14': 'FAS. PELABUHAN',
    'US.15': 'FAS. LAIN',
    'US.16': 'TERMINAL PETI',
    'US.17': 'GALANGAN',
    'US.18': 'LAP. PENGUSAHAAN',
    'PP.20': 'REKAYASA',
    'PP.21': 'PENG. BANGUNAN',
    'PP.22': 'PENG. ALAT',
    'PP.23': 'PENG. INSTALASI',
    'PP.24': 'PEM. BANGUNAN',
    'PP.25': 'PEM. ALAT',
    'PP.26': 'PEM. INSTALASI',
    'PP.27': 'PEM. LINGKUNGAN',
    'PP.28': 'LAP. TEKNIK',
    'KP.30': 'TU KEPEGAWAIAN',
    'KP.31': 'PENGANGKATAN',
    'KP.32': 'PENG. PEGAWAI',
    'KP.33': 'KESEJAHTERAAN',
    'KP.34': 'ASURANSI',
    'KP.35': 'PENSIUN',
    'KP.36': 'PENERBITAN',
    'KP.37': 'PEMBINAAN',
    'KP.38': 'MUTU TERPADU',
    'KP.39': 'TU DIKLAT',
    'KP.40': 'SELENGGARA DIKLAT',
    'KP.41': 'HASIL DIKLAT',
    'KP.42': 'LAP. SDM',
    'HK.45': 'PRODUK HUKUM',
    'HK.46': 'PERIKATAN HUKUM',
    'HI.47': 'HUB. INTERNASIONAL',
    'PM.48': 'PENGAMANAN',
    'UM.50': 'TATA USAHA',
    'UM.51': 'PERJALANAN DINAS',
    'UM.52': 'RUMAH TANGGA',
    'UM.53': 'KEPROTOKOLAN',
    'UM.54': 'LAP. UMUM',
    'UM.55': 'INVENTARISASI',
    'UM.56': 'PENGHAPUSAN',
    'UM.57': 'PERLENGKAPAN',
    'UM.58': 'PENGADAAN',
    'KU.60': 'BIAYA PENDAPATAN',
    'KU.61': 'VERIFIKASI',
    'KU.62': 'AKUNTANSI PAJAK',
    'KU.63': 'HUTANG PIUTANG',
    'KU.64': 'PERSEDIAAN KAS',
    'KU.65': 'CSR',
    'KU.66': 'LAP. KEUANGAN',
    'HM.70': 'PUBLIKASI',
    'HM.71': 'HUB. INSTANSI',
    'PS.80': 'TU PEMERIKSAAN',
    'PS.81': 'PEM. EKSTERNAL',
    'PS.82': 'PEM. INTERNAL'
};

// State
let arsipData = [];

// Inisialisasi
document.addEventListener('DOMContentLoaded', function() {
    loadDashboard();
});

// Load Dashboard Data
async function loadDashboard() {
    const refreshBtn = document.getElementById('refreshBtn');
    refreshBtn.classList.add('loading');
    
    try {
        const url = API_CONFIG.baseUrl + '?action=getData';
        
        const response = await fetch(url, {
            method: 'GET',
            redirect: 'follow'
        });
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        
        const data = await response.json();
        
        // Process data
        if (data && Array.isArray(data) && data.length > 0) {
            arsipData = data.map((row, index) => {
                return {
                    id: index + 1,
                    tanggalEntry: row.tanggalentry || row['tanggal entry'] || row['TANGGAL ENTRY'] || '',
                    kopel: row.kopel || row.KOPEL || '',
                    kodeUnit: row.kodeunit || row['kode unit'] || row['KODE UNIT'] || '',
                    indeks: row.indeks || row.INDEKS || '',
                    nomorBerkas: row.nomorberkas || row['nomor berkas'] || row['NOMOR BERKAS'] || '',
                    judulBerkas: row.judulberkas || row['judul berkas'] || row['JUDUL BERKAS'] || '',
                    nomorIsiBerkas: row.nomorrisiberkas || row['nomor isi berkas'] || row['NOMOR ISI BERKAS'] || '',
                    jenisNaskahDinas: row.jenisnaskahdinas || row['jenis naskah dinas'] || row['JENIS NASKAH DINAS'] || '',
                    klasifikasi: row.klasifikasi || row.KLASIFIKASI || '',
                    nomorSurat: row.nomorsurat || row['nomor surat'] || row['NOMOR SURAT'] || '',
                    tanggal: row.tanggal || row.TANGGAL || '',
                    tahun: row.tahun || row.TAHUN || '',
                    parahal: row.perihal || row.PERIHAL || '',
                    tingkatPerkembangan: row.tingkatperkembangan || row['tingkat perkembangan'] || row['TINGKAT PERKEMBANGAN'] || '',
                    kondisi: row.kondisi || row.KONDISI || '',
                    lokasiSimpan: row.lokasisimpan || row['lokasi simpan'] || row['LOKASI SIMPAN'] || '',
                    label: row.label || row.LABEL || '',
                    retensi: row.retensi || row['retensi aktif/inaktif'] || row['RETENSI AKTIF/INAKTIF'] || '',
                    keterangan: row.keterangan || row.KETERANGAN || ''
                };
            }).filter(item => item.nomorBerkas || item.judulBerkas);
            
            console.log('Dashboard loaded:', arsipData.length, 'records');
            
            // Render dashboard
            renderStats();
            renderChartTahun();
            renderChartKlasifikasi();
            renderRecentTable();
            
        } else {
            arsipData = [];
            renderEmptyState();
        }
        
    } catch (error) {
        console.error('Error loading dashboard:', error);
        renderErrorState(error.message);
    } finally {
        refreshBtn.classList.remove('loading');
    }
}

// Render Statistics Cards
function renderStats() {
    const statsGrid = document.getElementById('statsGrid');
    
    const totalArsip = arsipData.length;
    const aktifCount = arsipData.filter(d => d.retensi && d.retensi.toLowerCase() === 'aktif').length;
    const inaktifCount = arsipData.filter(d => d.retensi && d.retensi.toLowerCase() === 'inaktif').length;
    const thisYearCount = arsipData.filter(d => d.tahun && d.tahun.toString() === new Date().getFullYear().toString()).length;
    
    statsGrid.innerHTML = `
        <div class="stat-card">
            <div class="stat-icon">📁</div>
            <div class="stat-value">${totalArsip}</div>
            <div class="stat-label">Total Arsip</div>
        </div>
        
        <div class="stat-card green">
            <div class="stat-icon">✅</div>
            <div class="stat-value">${aktifCount}</div>
            <div class="stat-label">Retensi Aktif</div>
        </div>
        
        <div class="stat-card orange">
            <div class="stat-icon">⏳</div>
            <div class="stat-value">${inaktifCount}</div>
            <div class="stat-label">Retensi Inaktif</div>
        </div>
        
        <div class="stat-card red">
            <div class="stat-icon">📅</div>
            <div class="stat-value">${thisYearCount}</div>
            <div class="stat-label">Arsip Tahun Ini</div>
        </div>
    `;
}

// Render Chart by Tahun
function renderChartTahun() {
    const chartContainer = document.getElementById('chartTahun');
    
    // Count by tahun
    const tahunCounts = {};
    arsipData.forEach(item => {
        const tahun = item.tahun || 'Unknown';
        tahunCounts[tahun] = (tahunCounts[tahun] || 0) + 1;
    });
    
    // Sort by tahun
    const sortedTahun = Object.keys(tahunCounts).sort().reverse().slice(0, 5);
    const maxCount = Math.max(...Object.values(tahunCounts));
    
    if (sortedTahun.length === 0) {
        chartContainer.innerHTML = '<p style="color:#666;">Belum ada data</p>';
        return;
    }
    
    let html = '';
    sortedTahun.forEach(tahun => {
        const count = tahunCounts[tahun];
        const percentage = maxCount > 0 ? (count / maxCount) * 100 : 0;
        
        html += `
            <div class="chart-bar-item">
                <div class="chart-bar-label">${tahun}</div>
                <div class="chart-bar-container">
                    <div class="chart-bar-fill" style="width: ${percentage}%">${count}</div>
                </div>
            </div>
        `;
    });
    
    chartContainer.innerHTML = html;
}

// Render Chart by Klasifikasi
function renderChartKlasifikasi() {
    const chartContainer = document.getElementById('chartKlasifikasi');
    
    // Count by klasifikasi
    const klasifikasiCounts = {};
    arsipData.forEach(item => {
        if (item.klasifikasi) {
            // Extract kode only (before | if exists)
            const kode = item.klasifikasi.split('|')[0].trim();
            klasifikasiCounts[kode] = (klasifikasiCounts[kode] || 0) + 1;
        }
    });
    
    // Sort and get top 5
    const sortedKlasifikasi = Object.entries(klasifikasiCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5);
    
    const maxCount = sortedKlasifikasi.length > 0 ? sortedKlasifikasi[0][1] : 0;
    
    if (sortedKlasifikasi.length === 0) {
        chartContainer.innerHTML = '<p style="color:#666;">Belum ada data</p>';
        return;
    }
    
    let html = '';
    sortedKlasifikasi.forEach(([kode, count]) => {
        const percentage = maxCount > 0 ? (count / maxCount) * 100 : 0;
        const nama = klasifikasiNames[kode] || kode;
        
        html += `
            <div class="chart-bar-item">
                <div class="chart-bar-label">${kode}</div>
                <div class="chart-bar-container">
                    <div class="chart-bar-fill" style="width: ${percentage}%">${count}</div>
                </div>
            </div>
        `;
    });
    
    chartContainer.innerHTML = html;
}

// Render Recent Table
function renderRecentTable() {
    const tableBody = document.querySelector('#recentTable tbody');
    
    // Get 5 recent entries
    const recentData = arsipData.slice(0, 5);
    
    if (recentData.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="6" style="text-align:center;color:#666;">Belum ada data</td></tr>';
        return;
    }
    
    let html = '';
    recentData.forEach((item, index) => {
        const retensiBadge = item.retensi && item.retensi.toLowerCase() === 'aktif' 
            ? '<span class="status-badge aktif">' + item.retensi + '</span>' 
            : '<span class="status-badge inaktif">' + (item.retensi || '-') + '</span>';
        
        html += `
            <tr>
                <td>${index + 1}</td>
                <td>${formatDate(item.tanggalEntry)}</td>
                <td>${item.nomorBerkas || '-'}</td>
                <td>${truncateText(item.judulBerkas, 30)}</td>
                <td>${truncateText(item.klasifikasi, 20)}</td>
                <td>${retensiBadge}</td>
            </tr>
        `;
    });
    
    tableBody.innerHTML = html;
}

// Render Empty State
function renderEmptyState() {
    const statsGrid = document.getElementById('statsGrid');
    const chartTahun = document.getElementById('chartTahun');
    const chartKlasifikasi = document.getElementById('chartKlasifikasi');
    const tableBody = document.querySelector('#recentTable tbody');
    
    statsGrid.innerHTML = `
        <div class="stat-card">
            <div class="stat-icon">📁</div>
            <div class="stat-value">0</div>
            <div class="stat-label">Total Arsip</div>
        </div>
        <div class="stat-card green">
            <div class="stat-icon">✅</div>
            <div class="stat-value">0</div>
            <div class="stat-label">Retensi Aktif</div>
        </div>
        <div class="stat-card orange">
            <div class="stat-icon">⏳</div>
            <div class="stat-value">0</div>
            <div class="stat-label">Retensi Inaktif</div>
        </div>
        <div class="stat-card red">
            <div class="stat-icon">📅</div>
            <div class="stat-value">0</div>
            <div class="stat-label">Arsip Tahun Ini</div>
        </div>
    `;
    
    const emptyMsg = '<p style="color:#666;text-align:center;padding:20px;">Belum ada data di Spreadsheet</p>';
    chartTahun.innerHTML = emptyMsg;
    chartKlasifikasi.innerHTML = emptyMsg;
    tableBody.innerHTML = '<tr><td colspan="6" style="text-align:center;color:#666;">Belum ada data</td></tr>';
}

// Render Error State
function renderErrorState(errorMsg) {
    const statsGrid = document.getElementById('statsGrid');
    const chartTahun = document.getElementById('chartTahun');
    const chartKlasifikasi = document.getElementById('chartKlasifikasi');
    const tableBody = document.querySelector('#recentTable tbody');
    
    statsGrid.innerHTML = `
        <div style="grid-column:1/-1;padding:30px;text-align:center;color:#e74c3c;">
            <h3>Gagal Memuat Data</h3>
            <p>Error: ${errorMsg}</p>
        </div>
    `;
    
    chartTahun.innerHTML = '<p style="color:#e74c3c;text-align:center;padding:20px;">Error memuat data</p>';
    chartKlasifikasi.innerHTML = '<p style="color:#e74c3c;text-align:center;padding:20px;">Error memuat data</p>';
    tableBody.innerHTML = '<tr><td colspan="6" style="text-align:center;color:#e74c3c;">Error memuat data</td></tr>';
}

// Helper Functions
function formatDate(dateString) {
    if (!dateString) return '-';
    
    try {
        const date = new Date(dateString);
        if (isNaN(date.getTime())) {
            return dateString;
        }
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return day + '/' + month + '/' + year;
    } catch {
        return dateString;
    }
}

function truncateText(text, maxLength) {
    if (!text) return '';
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
}
