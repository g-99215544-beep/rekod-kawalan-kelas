// database.js
// Firebase config + fungsi rekod pemantauan + bacaan kehadiran harian

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDbCgDz2vK2BZUpwM3iDWJcPQSptVcNkv4",
  authDomain: "kehadiran-murid-6ece0.firebaseapp.com",
  databaseURL: "https://kehadiran-murid-6ece0-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "kehadiran-murid-6ece0",
  storageBucket: "kehadiran-murid-6ece0.firebasestorage.app",
  messagingSenderId: "223849234784",
  appId: "1:223849234784:web:e1471ded7ea17ba60bde05",
  measurementId: "G-4DY138HKTW"
};

// Inisialisasi Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const db = firebase.database();

/**
 * Simpan satu rekod pemantauan
 * Struktur:
 *  rekod_pemantauan/{autoId} : {
 *    tarikh: "dd/mm/yyyy",
 *    waktu: "W1" ... "W12" / "Luar Waktu PdP",
 *    masaRekod: "HH:MM:SS",
 *    namaGuru, kelas, tempat, jumlahMurid,
 *    namaMurid, jenis ("baik"/"jahat"/null),
 *    kategori, keterangan
 *  }
 */
function saveRecordToFirebase(record) {
  const ref = db.ref("rekod_pemantauan");
  return ref.push(record);
}

/**
 * Dengar semua rekod untuk tarikh tertentu (dd/mm/yyyy)
 * callback akan terima array rekod dengan id
 */
function subscribeToTodayRecords(tarikh, callback) {
  const query = db
    .ref("rekod_pemantauan")
    .orderByChild("tarikh")
    .equalTo(tarikh);

  query.on("value", (snapshot) => {
    const results = [];
    snapshot.forEach((child) => {
      results.push({
        id: child.key,
        ...child.val()
      });
    });
    callback(results);
  });
}

/**
 * Hentikan semua listener (guna bila tukar tarikh semak rekod)
 */
function unsubscribeTodayRecords() {
  db.ref("rekod_pemantauan").off();
}

/**
 * Ambil rekod kehadiran harian untuk satu kelas
 * - dateKey: "YYYY-MM-DD" (sama seperti modul kehadiran murid)
 * - kelas: contoh "5B"
 * Path di Firebase: kehadiran/{dateKey}/{kelas}
 */
function getAttendanceForClass(dateKey, kelas) {
  const path = "kehadiran/" + dateKey + "/" + kelas;
  return db
    .ref(path)
    .once("value")
    .then((snapshot) => snapshot.val());
}
