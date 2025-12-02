// database.js
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

// Simpan satu rekod
function saveRecordToFirebase(record) {
  const ref = db.ref("rekod_pemantauan");
  return ref.push(record);
}

// Dengar semua rekod untuk tarikh tertentu
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

// Hentikan semua listener (guna bila tukar tarikh)
function unsubscribeTodayRecords() {
  db.ref("rekod_pemantauan").off();
}
