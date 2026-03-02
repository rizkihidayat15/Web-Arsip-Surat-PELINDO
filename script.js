// Data Klasifikasi dari JavaScript Array (sesuai standar Pelindo)
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

// Konfigurasi Google Apps Script Web App URL
const GAS_WEB_APP_URL = 'https://script.google.com/macros/s/AKfycbwXa5Umo9ScVR90wQTKHoUHAJYCrHTinMa7CJp2kbJykPp3bqQaTl3sZ_yPkntsBW2UcA/exec';

document.addEventListener('DOMContentLoaded', function() {
    setDefaultDate();
    populateKlasifikasiDropdown();
    setupSearchableDropdown('kodeUnit', 'kodeUnitList');
    setupSearchableDropdown('klasifikasi', 'klasifikasiList');
    setupAutoFillTahun();
    setupFormValidation();
    setupRealtimeValidation();
});

function setDefaultDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    const todayString = year + '-' + month + '-' + day;
    
    const tanggalEntry = document.getElementById('tanggalEntry');
    if (tanggalEntry) tanggalEntry.value = todayString;
    
    const tanggalSurat = document.getElementById('tanggalSurat');
    if (tanggalSurat) {
        tanggalSurat.value = todayString;
        updateTahunFromTanggal();
    }
}

function populateKlasifikasiDropdown() {
    const klasifikasiList = document.getElementById('klasifikasiList');
    if (!klasifikasiList) return;
    
    klasifikasiList.innerHTML = '';
    
    klasifikasiData.forEach(item => {
        const div = document.createElement('div');
        div.className = 'dropdown-item';
        div.setAttribute('data-value', item.kode + ' | ' + item.nama);
        div.innerHTML = '<span class="code">' + item.kode + '</span>' + item.nama;
        div.addEventListener('click', function() {
            const input = document.getElementById('klasifikasi');
            input.value = item.kode + ' | ' + item.nama;
            hideDropdown('klasifikasiList');
            clearError('klasifikasi');
        });
        klasifikasiList.appendChild(div);
    });
}

function setupSearchableDropdown(inputId, listId) {
    const input = document.getElementById(inputId);
    const list = document.getElementById(listId);
    
    if (!input || !list) return;
    
    input.addEventListener('click', function() {
        toggleDropdown(listId);
    });
    
    input.addEventListener('input', function() {
        filterDropdown(inputId, listId);
    });
    
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.searchable-dropdown')) {
            hideDropdown(listId);
        }
    });
}

function toggleDropdown(listId) {
    const list = document.getElementById(listId);
    if (list.classList.contains('show')) {
        list.classList.remove('show');
    } else {
        document.querySelectorAll('.dropdown-list').forEach(d => d.classList.remove('show'));
        list.classList.add('show');
    }
}

function hideDropdown(listId) {
    const list = document.getElementById(listId);
    if (list) list.classList.remove('show');
}

function filterDropdown(inputId, listId) {
    const input = document.getElementById(inputId);
    const list = document.getElementById(listId);
    const filter = input.value.toLowerCase();
    const items = list.getElementsByClassName('dropdown-item');
    
    if (filter.length > 0) {
        list.classList.add('show');
    }
    
    for (let i = 0; i < items.length; i++) {
        const text = items[i].textContent || items[i].innerText;
        items[i].style.display = text.toLowerCase().indexOf(filter) > -1 ? '' : 'none';
    }
}

function setupAutoFillTahun() {
    const tanggalSurat = document.getElementById('tanggalSurat');
    if (tanggalSurat) {
        tanggalSurat.addEventListener('change', updateTahunFromTanggal);
        tanggalSurat.addEventListener('input', updateTahunFromTanggal);
    }
}

function updateTahunFromTanggal() {
    const tanggalSurat = document.getElementById('tanggalSurat');
    const tahun = document.getElementById('tahun');
    
    if (tanggalSurat && tahun && tanggalSurat.value) {
        const date = new Date(tanggalSurat.value);
        if (!isNaN(date.getFullYear())) {
            tahun.value = date.getFullYear();
            clearError('tahun');
        }
    }
}

function setupRealtimeValidation() {
    const nomorBerkas = document.getElementById('nomorBerkas');
    if (nomorBerkas) {
        nomorBerkas.addEventListener('input', function() {
            this.value = this.value.replace(/[^0-9]/g, '');
            if (this.value) clearError('nomorBerkas');
        });
        nomorBerkas.addEventListener('blur', function() {
            validateRequired(this, 'nomorBerkas');
        });
    }
    
    const jenisNaskahDinas = document.getElementById('jenisNaskahDinas');
    if (jenisNaskahDinas) {
        jenisNaskahDinas.addEventListener('input', function() {
            this.value = this.value.replace(/[^a-zA-Z\s]/g, '');
            if (this.value) clearError('jenisNaskahDinas');
        });
        jenisNaskahDinas.addEventListener('blur', function() {
            validateRequired(this, 'jenisNaskahDinas');
        });
    }
    
    const allInputs = document.querySelectorAll('input, select, textarea');
    allInputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.hasAttribute('required') && this.value) {
                clearError(this.id.replace('error-', ''));
            }
        });
        input.addEventListener('input', function() {
            if (this.classList.contains('error')) {
                clearError(this.id);
            }
        });
    });
    
    const kodeUnitItems = document.querySelectorAll('#kodeUnitList .dropdown-item');
    kodeUnitItems.forEach(item => {
        item.addEventListener('click', function() {
            const input = document.getElementById('kodeUnit');
            input.value = this.getAttribute('data-value');
            hideDropdown('kodeUnitList');
            clearError('kodeUnit');
        });
    });
}

function validateRequired(input, fieldName) {
    if (!input.value.trim()) {
        showError(fieldName, 'Field ini wajib diisi');
        return false;
    } else {
        clearError(fieldName);
        return true;
    }
}

function showError(fieldName, message) {
    const errorElement = document.getElementById('error-' + fieldName);
    const inputElement = document.getElementById(fieldName);
    
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }
    if (inputElement) {
        inputElement.classList.add('error');
    }
}

function clearError(fieldName) {
    const errorElement = document.getElementById('error-' + fieldName);
    const inputElement = document.getElementById(fieldName);
    
    if (errorElement) {
        errorElement.textContent = '';
        errorElement.style.display = 'none';
    }
    if (inputElement) {
        inputElement.classList.remove('error');
    }
}

function setupFormValidation() {
    const form = document.getElementById('arsipForm');
    const submitBtn = form.querySelector('button[type="submit"]');
    
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        if (validateForm()) {
            const dataArsip = getFormDataAsJSON();
            
            console.log('=== DATA ARSIP SURAT (JSON) ===');
            console.log(JSON.stringify(dataArsip, null, 2));
            console.log('================================');
            
            submitBtn.disabled = true;
            submitBtn.textContent = 'Mengirim...';
            
            try {
                const response = await sendDataToGoogleSheets(dataArsip);
                
                if (response.success) {
                    showNotification('Data arsip berhasil disimpan!', 'success');
                    form.reset();
                    setDefaultDate();
                    
                    const inputs = form.querySelectorAll('input, select, textarea');
                    inputs.forEach(input => {
                        input.classList.remove('error');
                        const errorElement = document.getElementById('error-' + input.id);
                        if (errorElement) {
                            errorElement.textContent = '';
                            errorElement.style.display = 'none';
                        }
                    });
                    
                    console.log('Response:', response);
                } else {
                    throw new Error(response.message || 'Gagal menyimpan data');
                }
            } catch (error) {
                console.error('Error:', error);
                showNotification('Gagal menyimpan data: ' + error.message, 'error');
            } finally {
                submitBtn.disabled = false;
                submitBtn.textContent = 'Simpan';
            }
        }
    });
    
    form.addEventListener('reset', function() {
        const inputs = form.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.classList.remove('error');
            const errorElement = document.getElementById('error-' + input.id);
            if (errorElement) {
                errorElement.textContent = '';
                errorElement.style.display = 'none';
            }
        });
        setDefaultDate();
    });
}

async function sendDataToGoogleSheets(data) {
    try {
        const response = await fetch(GAS_WEB_APP_URL, {
            method: 'POST',
            mode: 'no-cors',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        
        return { success: true, message: 'Data berhasil dikirim' };
    } catch (error) {
        console.error('Fetch Error:', error);
        return { success: false, message: error.message || 'Terjadi kesalahan saat mengirim data' };
    }
}

function showNotification(message, type) {
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) existingNotification.remove();
    
    const notification = document.createElement('div');
    notification.className = 'notification notification-' + type;
    notification.textContent = message;
    
    notification.style.position = 'fixed';
    notification.style.top = '20px';
    notification.style.right = '20px';
    notification.style.padding = '15px 25px';
    notification.style.borderRadius = '8px';
    notification.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
    notification.style.zIndex = '10000';
    notification.style.animation = 'slideIn 0.3s ease';
    
    if (type === 'success') {
        notification.style.backgroundColor = '#27ae60';
        notification.style.color = 'white';
    } else {
        notification.style.backgroundColor = '#e74c3c';
        notification.style.color = 'white';
    }
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 5000);
}

function getFormDataAsJSON() {
    const fieldMapping = {
        tanggalEntry: 'TANGGAL ENTRY',
        kopel: 'KOPEL',
        kodeUnit: 'KODE UNIT',
        indeks: 'INDEKS',
        nomorBerkas: 'NOMOR BERKAS',
        judulBerkas: 'JUDUL BERKAS',
        nomorIsiBerkas: 'NOMOR ISI BERKAS',
        jenisNaskahDinas: 'JENIS NASKAH DINAS',
        klasifikasi: 'KLASIFIKASI',
        nomorSurat: 'NOMOR SURAT',
        tanggalSurat: 'TANGGAL',
        tahun: 'TAHUN',
        perchal: 'PERIHAL',
        tingkatPerkembangan: 'TINGKAT PERKEMBANGAN',
        kondisi: 'KONDISI',
        lokasiSimpan: 'LOKASI SIMPAN',
        label: 'LABEL',
        retensi: 'RETENSI AKTIF/INAKTIF',
        keterangan: 'KETERANGAN'
    };
    
    const dataArsip = {};
    
    for (const [fieldId, spreadsheetColumn] of Object.entries(fieldMapping)) {
        const element = document.getElementById(fieldId);
        if (element) {
            dataArsip[spreadsheetColumn] = element.value;
        }
    }
    
    return dataArsip;
}

function validateForm() {
    const form = document.getElementById('arsipForm');
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    let firstErrorField = null;
    
    requiredFields.forEach(field => {
        const fieldName = field.id;
        if (fieldName === 'tahun') return;
        
        if (!field.value.trim()) {
            showError(fieldName, 'Field ini wajib diisi');
            isValid = false;
            if (!firstErrorField) firstErrorField = field;
        } else {
            clearError(fieldName);
        }
    });
    
    const nomorBerkas = document.getElementById('nomorBerkas');
    if (nomorBerkas && nomorBerkas.value) {
        if (!/^\d+$/.test(nomorBerkas.value)) {
            showError('nomorBerkas', 'NOMOR BERKAS hanya boleh berisi angka');
            isValid = false;
            if (!firstErrorField) firstErrorField = nomorBerkas;
        }
    }
    
    const jenisNaskahDinas = document.getElementById('jenisNaskahDinas');
    if (jenisNaskahDinas && jenisNaskahDinas.value) {
        if (!/^[a-zA-Z\s]+$/.test(jenisNaskahDinas.value)) {
            showError('jenisNaskahDinas', 'JENIS NASKAH DINAS hanya boleh berisi huruf');
            isValid = false;
            if (!firstErrorField) firstErrorField = jenisNaskahDinas;
        }
    }
    
    if (!isValid) {
        if (firstErrorField) {
            firstErrorField.scrollIntoView({ behavior: 'smooth', block: 'center' });
            firstErrorField.focus();
        }
    }
    
    return isValid;
}

document.querySelectorAll('input, select, textarea').forEach(element => {
    element.addEventListener('focus', function() {
        this.parentElement.classList.add('focused');
    });
    element.addEventListener('blur', function() {
        this.parentElement.classList.remove('focused');
    });
});
