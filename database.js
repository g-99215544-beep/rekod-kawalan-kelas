
// Firebase Configuration
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

// Initialize Firebase
if (typeof firebase !== 'undefined') {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
} else {
  console.error("Firebase SDK not found. Ensure firebase-app.js and firebase-database.js are included in index.html");
}

// Initialize Database and export to window
// This defines 'db' so it can be used in index.html
let db;
if (typeof firebase !== 'undefined' && firebase.apps.length) {
  db = firebase.database();
  window.db = db; // Explicitly attach to window to ensure availability in inline scripts
  console.log("Firebase initialized successfully");
} else {
  // Fallback/Mock to prevent "db is not defined" crash if config is missing, 
  // allowing UI to render even if data saves fail.
  console.warn("Firebase not initialized. Using mock DB object.");
  db = {
    ref: function(path) {
      console.warn("DB operation on mock object:", path);
      return {
        push: () => ({ key: 'mock_key_' + Date.now() }),
        set: () => Promise.reject("Firebase not connected"),
        on: () => {},
        once: () => Promise.resolve({ exists: () => false, val: () => null }),
        orderByChild: () => ({ equalTo: () => ({ once: () => Promise.resolve({ val: () => null }) }) }),
        update: () => Promise.reject("Firebase not connected"),
        remove: () => Promise.reject("Firebase not connected")
      };
    }
  };
  window.db = db;
}
