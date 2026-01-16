// Firebase Configuration for Teachers Database
const teachersFirebaseConfig = {
  apiKey: "AIzaSyCpRe6EpshreXgNW3CQe6ACZkxxBlH0rnI",
  authDomain: "pinjaman-4b662.firebaseapp.com",
  databaseURL: "https://pinjaman-4b662-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "pinjaman-4b662",
  storageBucket: "pinjaman-4b662.firebasestorage.app",
  messagingSenderId: "840792083486",
  appId: "1:840792083486:web:6086e62521fd771063320f",
  measurementId: "G-R6WVPCJ4KT"
};

// Initialize second Firebase app for teachers database
let teachersDb;
if (typeof firebase !== 'undefined') {
  try {
    // Check if teachersApp already exists
    let teachersApp;
    try {
      teachersApp = firebase.app("teachersApp");
      console.log("Teachers Firebase app already exists, reusing...");
    } catch (e) {
      // App doesn't exist, create it
      teachersApp = firebase.initializeApp(teachersFirebaseConfig, "teachersApp");
      console.log("Teachers Firebase app created successfully");
    }
    teachersDb = teachersApp.database();
    window.teachersDb = teachersDb;
    console.log("Teachers Firebase database initialized successfully");
  } catch (error) {
    console.error("Error initializing teachers database:", error);
    // Fallback mock
    teachersDb = {
      ref: function(path) {
        console.warn("Teachers DB operation on mock object:", path);
        return {
          once: () => Promise.resolve({ exists: () => false, val: () => null }),
          on: () => {},
          push: () => ({ key: 'mock_key_' + Date.now(), set: () => Promise.reject("Mock DB") }),
          remove: () => Promise.reject("Mock DB")
        };
      }
    };
    window.teachersDb = teachersDb;
  }
} else {
  console.error("Firebase SDK not found for teachers database");
  teachersDb = {
    ref: function(path) {
      console.warn("Teachers DB operation on mock object:", path);
      return {
        once: () => Promise.resolve({ exists: () => false, val: () => null }),
        on: () => {},
        push: () => ({ key: 'mock_key_' + Date.now(), set: () => Promise.reject("Mock DB") }),
        remove: () => Promise.reject("Mock DB")
      };
    }
  };
  window.teachersDb = teachersDb;
}
