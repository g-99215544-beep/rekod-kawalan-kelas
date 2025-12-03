// database.js
// Firebase config + fungsi rekod pemantauan + bacaan kehadiran harian

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

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
const db = firebase.database();

// ====== Rekod pemantauan ======
function saveRecordToFirebase(record) {
  return db.ref("rekod_pemantauan").push(record);
}
function subscribeToTodayRecords(tarikh, callback) {
  const query = db
    .ref("rekod_pemantauan")
    .orderByChild("tarikh")
    .equalTo(tarikh);
  query.on("value", (snapshot) => {
    const results = [];
    snapshot.forEach((child) => {
      results.push({ id: child.key, ...child.val() });
    });
    callback(results);
  });
}
function unsubscribeTodayRecords() {
  db.ref("rekod_pemantauan").off();
}

// ====== Data kehadiran harian (dari app kehadiran murid) ======
// Struktur: kehadiran/{YYYY-MM-DD}/{KELAS} → {present, total, absentCount, absentNames, ...}
function getAttendanceForClass(dateKey, kelas) {
  const path = "kehadiran/" + dateKey + "/" + kelas;
  return db.ref(path).once("value").then((snap) => snap.val());
}
