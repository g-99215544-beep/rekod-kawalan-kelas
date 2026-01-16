# 📤 Panduan Upload Data Guru ke Firebase

## 📋 Ringkasan
Sistem ini telah dikemas kini untuk menyimpan data lengkap guru termasuk:
- ✅ 39 orang guru
- ✅ 4 orang staf
- ✅ Maklumat: Nama, Gred, No. Telefon, Jawatan/Opsyen

## 🚀 Cara Upload Data

### Langkah 1: Buka fail upload
1. Buka fail `upload-guru.html` dalam pelayar web (Chrome, Firefox, Edge, Safari)
2. Atau double-click pada fail tersebut

### Langkah 2: Upload data
1. Baca amaran dengan teliti - **operasi ini akan memadam data lama**
2. Klik butang **"🚀 Upload Data Sekarang"**
3. Tunggu sehingga log menunjukkan "🎉 UPLOAD SELESAI!"
4. Refresh aplikasi utama untuk melihat data baru

### Langkah 3: Sahkan upload
1. Buka aplikasi utama (index.html)
2. Pergi ke tab "ISI REKOD"
3. Klik dropdown "Nama Guru"
4. Pastikan semua 43 nama (39 guru + 4 staf) terpapar

## 🔐 Firebase Rules (Penting!)

Untuk membolehkan upload data, Firebase Realtime Database memerlukan rules yang betul.

### Rules Yang Disyorkan (Untuk Development)

Pergi ke **Firebase Console** → **Realtime Database** → **Rules** dan gunakan rules ini:

#### Option 1: Public Write (Untuk Testing Sahaja)
```json
{
  "rules": {
    "guru": {
      ".read": true,
      ".write": true
    }
  }
}
```
⚠️ **AMARAN**: Rules ini membenarkan sesiapa sahaja menulis data. Gunakan untuk testing sahaja!

#### Option 2: Authenticated Users Only (Disyorkan)
```json
{
  "rules": {
    "guru": {
      ".read": true,
      ".write": "auth != null"
    }
  }
}
```
✅ **DISYORKAN**: Hanya pengguna yang log masuk boleh menulis data.

#### Option 3: Admin Only (Paling Selamat)
```json
{
  "rules": {
    "guru": {
      ".read": true,
      ".write": "root.child('admins').child(auth.uid).exists()"
    }
  }
}
```
🔒 **PALING SELAMAT**: Hanya admin yang didaftarkan boleh menulis data.

### Cara Update Firebase Rules

1. Pergi ke [Firebase Console](https://console.firebase.google.com/)
2. Pilih project **pinjaman-4b662**
3. Di sidebar, pilih **Realtime Database**
4. Klik tab **Rules**
5. Copy dan paste rules yang sesuai
6. Klik **Publish**

## 📊 Struktur Data Firebase

Data disimpan di path `guru/` dengan struktur:

```json
{
  "guru": {
    "guru_001": {
      "nama": "MAHATHIR BIN MD SAHAK",
      "gred": "DG6",
      "telefon": "01155590863",
      "jawatan": "Guru Besar"
    },
    "guru_002": {
      "nama": "MUHAIZAM BIN MD MOKHTAR",
      "gred": "DG10",
      "telefon": "0125632329",
      "jawatan": "PK Pentadbiran"
    },
    ...
    "staf_001": {
      "nama": "MUHAMAD IKHWAN FARHAN B. MOHD SHUKRI",
      "gred": "N1",
      "telefon": "0174356428",
      "jawatan": "PT"
    },
    ...
  }
}
```

## 🔧 Troubleshooting

### Error: "Permission denied"
**Sebab**: Firebase rules tidak membenarkan write access
**Penyelesaian**: Update Firebase rules seperti di atas

### Error: "Firebase not initialized"
**Sebab**: Pelayar menyekat skrip Firebase
**Penyelesaian**:
1. Pastikan sambungan internet aktif
2. Disable extensions yang menyekat skrip (e.g., AdBlock)
3. Cuba pelayar lain

### Dropdown tidak menunjukkan guru baru
**Sebab**: Cache pelayar atau Service Worker
**Penyelesaian**:
1. Hard refresh: Ctrl + Shift + R (Windows) atau Cmd + Shift + R (Mac)
2. Clear cache pelayar
3. Tutup dan buka semula aplikasi

### Data lama masih kelihatan
**Sebab**: Service Worker menggunakan cache lama
**Penyelesaian**:
1. Unregister service worker:
   - Buka DevTools (F12)
   - Pergi ke Application → Service Workers
   - Klik "Unregister"
2. Refresh aplikasi

## 📁 Fail-Fail Yang Berkaitan

- `upload-guru.html` - Tool untuk upload data guru ke Firebase
- `guru-data.json` - Data guru dalam format JSON (backup)
- `teachers-db.js` - Configuration Firebase untuk teachers database
- `index.html` - Aplikasi utama (baris 1886-1963: loadGuruFromFirebase function)

## ✅ Checklist Selepas Upload

- [ ] Data guru berjaya diupload ke Firebase
- [ ] Dropdown "Nama Guru" menunjukkan 43 nama (39 guru + 4 staf)
- [ ] Nama guru terpapar dengan nombor: 1) NAMA GURU, 2) NAMA GURU, etc.
- [ ] Boleh pilih guru dan submit form tanpa error
- [ ] Data tersimpan dengan betul di Firebase path `kawalan/`

## 💡 Tips

1. **Backup Data**: Sebelum upload, export data lama dari Firebase Console
2. **Testing**: Cuba submit form dengan data baru untuk pastikan semua berfungsi
3. **Cache**: Jika ada masalah, sentiasa cuba hard refresh dahulu
4. **Rules**: Untuk production, gunakan rules yang lebih ketat (Option 3)

## 📞 Sokongan

Jika menghadapi masalah:
1. Semak Firebase Console untuk error logs
2. Buka DevTools (F12) untuk lihat console errors
3. Pastikan Firebase rules sudah dikonfigurasi dengan betul

---

**Dicipta pada**: 16 Januari 2026
**Versi**: 1.0
