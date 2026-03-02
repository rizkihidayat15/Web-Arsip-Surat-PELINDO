// Konfigurasi API - URL Apps Script
const API_CONFIG = {
    baseUrl: 'https://script.google.com/macros/s/AKfycbwXa5Umo9ScVR90wQTKHoUHAJYCrHTinMa7CJp2kbJykPp3bqQaTl3sZ_yPkntsBW2UcA/exec',
    sheetName: 'Arsip Surat'
};

// Data klasifikasi untuk filter dropdown
const klasifikasiData = [
    { kode: 'PR.01', nama: 'PENELITIAN (STUDI, SURVEY, RISET)' },
    { kode: 'PR.02', nama: 'PERENCANAAN DAN PENGEMBANGAN' },
    { kode: 'PR.03', nama: 'TEKNOLOGI INFORMASI' },
    { kode: 'PR.04', nama: 'LAPORAN' },
    { kode: 'US.10', nama: 'PEMASARAN / PROMOSI' },
    { kode: 'US.11', nama: 'TARIF / JASA PELABUHAN' },
    { kode: 'US.12', nama: 'BISNIS MARITIM / PELAYARAN / PELAYANAN' },
    { kode: 'US.13', nama: 'PELAYANAN TERMINAL KONVENSIONAL' },
    { kode: 'US.14', nama: 'PELAYANAN FASILITAS PELABUHAN' },
    { kode: 'US.15', nama: 'PELAYANAN FASILITAS / JASA LAINNYA' },
    { kode: 'US.16', nama: 'PELAYANAN TERMINAL PETI KEMAS' },
    { kode: 'US.17', nama: 'PELAYANAN JASA GALANGAN' },
    { kode: 'US.18', nama: 'LAPORAN PENGUSAHAAN JASA' },
    { kode: 'PP.20', nama: 'REKAYASA BANGUNAN' },
    { kode: 'PP.21', nama: 'PENGADAAN BANGUNAN' },
    { kode: 'PP.22', nama: 'PENGADAAN ALAT-ALAT' },
    { kode: 'PP.23', nama: 'PENGADAAN INSTALASI' },
    { kode: 'PP.24', nama: 'PEMELIHARAAN BANGUNAN' },
    { kode: 'PP.25', nama: 'PEMELIHARAAN ALAT-ALAT' },
    { kode: 'PP.26', nama: 'PEMELIHARAAN INSTALASI' },
    { kode: 'PP.27', nama: 'PEMELIHARAAN LINGKUNGAN' },
    { kode: 'PP.28', nama: 'LAPORAN DIVISI TEKNIK' },
    { kode: 'KP.30', nama: 'TATA USAHA KEPEGAWAIAN' },
    { kode: 'KP.31', nama: 'PENGANGKATAN DAN KEPANGKATAN' },
    { kode: 'KP.32', nama: 'PENGEMBANGAN PEGAWAI' },
    { kode: 'KP.33', nama: 'KESEJAHTERAAN PEGAWAI' },
    { kode: 'KP.34', nama: 'ASURANSI DAN JAMINAN SOSIAL' },
    { kode: 'KP.35', nama: 'PEMBERHENTIAN DAN PENSIUN' },
    { kode: 'KP.36', nama: 'PENERBITAN PEGAWAI' },
    { kode: 'KP.37', nama: 'PEMBINAAN MENTAL' },
    { kode: 'KP.38', nama: 'PENGEMBANGAN MUTU TERPADU' },
    { kode: 'KP.39', nama: 'TATA USAHA DIKLAT' },
    { kode: 'KP.40', nama: 'PENYELENGGARAAN DIKLAT' },
    { kode: 'KP.41', nama: 'HASIL DIKLAT' },
    { kode: 'KP.42', nama: 'LAPORAN MANAJEMEN STRATEGIS SDM' },
    { kode: 'HK.45', nama: 'PRODUK HUKUM' },
    { kode: 'HK.46', nama: 'PERIKATAN DAN PENELAAHAN HUKUM' },
    { kode: 'HI.47', nama: 'HUBUNGAN INTERNASIONAL' },
    { kode: 'PM.48', nama: 'PENGAMANAN PERUSAHAAN' },
    { kode: 'UM.50', nama: 'TATA USAHA' },
    { kode: 'UM.51', nama: 'PERJALANAN DINAS' },
    { kode: 'UM.52', nama: 'RUMAH TANGGA' },
    { kode: 'UM.53', nama: 'KEPROTOKOLAN' },
    { kode: 'UM.54', nama: 'LAPORAN DIVISI UMUM' },
    { kode: 'UM.55', nama: 'INVENTARISASI' },
    { kode: 'UM.56', nama: 'PENGHAPUSAN' },
    { kode: 'UM.57', nama: 'PERLENGKAPAN / PERBAIKAN / RENOVASI' },
    { kode: 'UM.58', nama: 'PEMILIHAN LANGSUNG / PENGADAAN' },
    { kode: 'KU.60', nama: 'BIAYA DAN PENDAPATAN' },
    { kode: 'KU.61', nama: 'VERIFIKASI DAN AKTIVA TETAP' },
    { kode: 'KU.62', nama: 'AKUNTANSI DAN PAJAK' },
    { kode: 'KU.63', nama: 'TATA USAHA HUTANG PIUTANG' },
    { kode: 'KU.64', nama: 'PERSEDIAAN DAN KAS' },
    { kode: 'KU.65', nama: 'CSR / KBL' },
    { kode: 'KU.66', nama: 'LAPORAN KEUANGAN' },
    { kode: 'HM.70', nama: 'PUBLIKASI' },
    { kode: 'HM.71', nama: 'HUBUNGAN ANTAR INSTANSI' },
    { kode: 'PS.80', nama: 'TATA USAHA PEMERIKSAAN' },
    { kode: 'PS.81', nama: 'PEMERIKSAAN EKSTERNAL' },
    { kode: 'PS.82', nama: 'PEMERIKSAAN INTERNAL' }
];

// State aplikasi
let arsipData = [];
let filteredData = [];
let currentPage = 1;
const itemsPerPage = 15;
let autoRefreshInterval = null;

// Inisialisasi saat DOM siap
document.addEventListener('DOMContentLoaded', function() {
    populateFilters();
    fetchData();
    setupEventListeners();
    setupAutoRefresh();
});

// Isi dropdown filter
function populateFilters() {
    const tahunFilter = document.getElementById('filterTahun');
    const klasifikasiFilter = document.getElementById('filterKlasifikasi');
    
    const currentYear = new Date().getFullYear();
    for (let year = currentYear; year >= currentYear - 10; year--) {
        const option = document.createElement('option');
        option.value = year;
        option.textContent = year;
        tahunFilter.appendChild(option);
    }
    
    klasifikasiData.forEach(item => {
        const option = document.createElement('option');
        option.value = item.kode;
        option.textContent = item.kode + ' | ' + item.nama;
        klasifikasiFilter.appendChild(option);
    });
}

// Setup event listeners
function setupEventListeners() {
    document.getElementById('searchInput').addEventListener('input', debounce(handleSearch, 300));
    document.getElementById('filterTahun').addEventListener('change', handleFilter);
    document.getElementById('filterKlasifikasi').addEventListener('change', handleFilter);
    document.getElementById('filterRetensi').addEventListener('change', handleFilter);
    document.getElementById('refreshBtn').addEventListener('click', fetchData);
}

// Fetch data REAL dari Spreadsheet via Apps Script
async function fetchData() {
    const refreshBtn = document.getElementById('refreshBtn');
    const tableContent = document.getElementById('tableContent');
    
    refreshBtn.classList.add('loading');
    
    try {
        // URL API dengan parameter action=getData
        const url = API_CONFIG.baseUrl + '?action=getData';
        
        console.log('Fetching from:', url);
        
        const response = await fetch(url, {
            method: 'GET',
            redirect: 'follow'
        });
        
        if (!response.ok) {
            throw new Error('Network response was not ok: ' + response.status);
        }
        
        const data = await response.json();
        
        console.log('Response data:', data);
        
        // Validasi dan proses data dari Spreadsheet
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
                    retensi: row.retensi || row['retensi aktif/inaktif'] || row['RETENSI AKTIF/INAKTIF'] || row['retensi'] || '',
                    keterangan: row.keterangan || row.KETERANGAN || ''
                };
            }).filter(item => item.nomorBerkas || item.judulBerkas);
            
            console.log('Data loaded:', arsipData.length, 'records');
        } else {
            console.log('No data found in Spreadsheet');
            arsipData = [];
        }
        
        filteredData = [...arsipData];
        currentPage = 1;
        renderTable();
        
    } catch (error) {
        console.error('Error fetching data:', error);
        arsipData = [];
        filteredData = [];
        currentPage = 1;
        
        tableContent.innerHTML = `
            <div class="error-state">
                <h3>Gagal Memuat Data</h3>
                <p>Error: ${error.message}</p>
                <p style="font-size:12px;margin-top:10px;">Cek console browser untuk detail</p>
                <br>
                <button class="btn-refresh" onclick="fetchData()">Coba Lagi</button>
            </div>
        `;
    } finally {
        refreshBtn.classList.remove('loading');
    }
}

// Handle pencarian
function handleSearch(e) {
    const searchTerm = e.target.value.toLowerCase();
    
    filteredData = arsipData.filter(item => {
        return (
            (item.judulBerkas && item.judulBerkas.toLowerCase().includes(searchTerm)) ||
            (item.nomorSurat && item.nomorSurat.toLowerCase().includes(searchTerm)) ||
            (item.parahal && item.parahal.toLowerCase().includes(searchTerm)) ||
            (item.kopel && item.kopel.toLowerCase().includes(searchTerm)) ||
            (item.klasifikasi && item.klasifikasi.toLowerCase().includes(searchTerm))
        );
    });
    
    applyFilters();
}

function handleFilter() {
    applyFilters();
}

function applyFilters() {
    const tahun = document.getElementById('filterTahun').value;
    const klasifikasi = document.getElementById('filterKlasifikasi').value;
    const retensi = document.getElementById('filterRetensi').value;
    
    filteredData = arsipData.filter(item => {
        const matchTahun = !tahun || (item.tahun && item.tahun.toString() === tahun);
        const matchKlasifikasi = !klasifikasi || (item.klasifikasi && item.klasifikasi.includes(klasifikasi));
        const matchRetensi = !retensi || (item.retensi && item.retensi.toLowerCase() === retensi.toLowerCase());
        
        return matchTahun && matchKlasifikasi && matchRetensi;
    });
    
    currentPage = 1;
    renderTable();
}

// Render tabel
function renderTable() {
    const tableContent = document.getElementById('tableContent');
    
    if (filteredData.length === 0) {
        tableContent.innerHTML = `
            <div class="no-data">
                <h3>Tidak Ada Data</h3>
                <p>Belum ada arsip di Spreadsheet</p>
                <p style="font-size:12px;color:#666;">Cek console browser (F12) untuk pesan error</p>
            </div>
        `;
        return;
    }
    
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const pageData = filteredData.slice(startIndex, endIndex);
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    
    let tableHTML = '<table class="data-table"><thead><tr>';
    tableHTML += '<th>No</th><th>Tanggal Entry</th><th>KOPEL</th><th>Kode Unit</th>';
    tableHTML += '<th>Nomor Berkas</th><th>Judul Berkas</th><th>Klasifikasi</th>';
    tableHTML += '<th>Nomor Surat</th><th>Tahun</th><th>Retensi</th><th>Kondisi</th><th>Aksi</th>';
    tableHTML += '</tr></thead><tbody>';
    
    pageData.forEach((item, index) => {
        const retensiBadge = item.retensi && item.retensi.toLowerCase() === 'aktif' ? 'aktif' : 'inaktif';
        
        tableHTML += '<tr>';
        tableHTML += '<td>' + (startIndex + index + 1) + '</td>';
        tableHTML += '<td>' + formatDate(item.tanggalEntry) + '</td>';
        tableHTML += '<td>' + (item.kopel || '-') + '</td>';
        tableHTML += '<td>' + (item.kodeUnit || '-') + '</td>';
        tableHTML += '<td>' + (item.nomorBerkas || '-') + '</td>';
        tableHTML += '<td>' + truncateText(item.judulBerkas, 30) + '</td>';
        tableHTML += '<td>' + truncateText(item.klasifikasi, 25) + '</td>';
        tableHTML += '<td>' + (item.nomorSurat || '-') + '</td>';
        tableHTML += '<td>' + (item.tahun || '-') + '</td>';
        tableHTML += '<td><span class="status-badge ' + retensiBadge + '">' + (item.retensi || '-') + '</span></td>';
        tableHTML += '<td>' + (item.kondisi || '-') + '</td>';
        tableHTML += '<td>';
        tableHTML += '<button class="action-btn view" onclick="viewDetail(' + item.id + ')">Lihat</button>';
        tableHTML += '<button class="action-btn delete" onclick="deleteData(' + item.id + ')">Hapus</button>';
        tableHTML += '</td></tr>';
    });
    
    tableHTML += '</tbody></table>';
    
    tableHTML += '<div class="table-footer"><div class="table-info">';
    tableHTML += 'Menampilkan ' + (startIndex + 1) + '-' + Math.min(endIndex, filteredData.length) + ' dari ' + filteredData.length + ' data';
    tableHTML += '</div><div class="pagination">';
    tableHTML += '<button onclick="changePage(1)" ' + (currentPage === 1 ? 'disabled' : '') + '>««</button>';
    tableHTML += '<button onclick="changePage(currentPage - 1)" ' + (currentPage === 1 ? 'disabled' : '') + '>«</button>';
    
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, currentPage + 2);
    
    if (endPage - startPage < 4) {
        if (startPage === 1) {
            endPage = Math.min(5, totalPages);
        } else {
            startPage = Math.max(1, totalPages - 4);
        }
    }
    
    for (let i = startPage; i <= endPage; i++) {
        tableHTML += '<button class="' + (i === currentPage ? 'active' : '') + '" onclick="changePage(' + i + ')">' + i + '</button>';
    }
    
    tableHTML += '<button onclick="changePage(currentPage + 1)" ' + (currentPage === totalPages ? 'disabled' : '') + '>»</button>';
    tableHTML += '<button onclick="changePage(totalPages)" ' + (currentPage === totalPages ? 'disabled' : '') + '>»»</button>';
    tableHTML += '</div></div>';
    
    tableContent.innerHTML = tableHTML;
}

function changePage(page) {
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    if (page < 1 || page > totalPages) return;
    
    currentPage = page;
    renderTable();
    
    document.querySelector('.data-table').scrollIntoView({ behavior: 'smooth' });
}

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

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function setupAutoRefresh() {
    autoRefreshInterval = setInterval(fetchData, 30000);
}

function viewDetail(id) {
    const item = arsipData.find(d => d.id === id);
    if (item) {
        let detailText = 'Detail Arsip:\n\n';
        for (const [key, value] of Object.entries(item)) {
            if (value) {
                detailText += key + ': ' + value + '\n';
            }
        }
        alert(detailText);
    }
}

function deleteData(id) {
    if (confirm('Apakah Anda yakin ingin menghapus arsip ini?')) {
        alert('Fitur hapus memerlukan integrasi dengan Apps Script. Silakan hapus langsung di Spreadsheet.');
    }
}

window.addEventListener('beforeunload', function() {
    if (autoRefreshInterval) {
        clearInterval(autoRefreshInterval);
    }
});
