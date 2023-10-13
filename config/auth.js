const dotenv = require("dotenv");
dotenv.config();

// Firebase Admin
const admin = require("firebase-admin");
const firebaseConfigAdmin = require("../causal-calculus-371108-firebase-adminsdk-6isua-a5b8ccdc69.json");

admin.initializeApp({
  credential: admin.credential.cert(firebaseConfigAdmin),
  storageBucket: "gs://causal-calculus-371108.appspot.com",
});

const authAdmin = admin.auth();
const db = admin.firestore();

// Firebase Client
const { getAuth } = require("firebase/auth");
const { initializeApp } = require("firebase/app");

const firebaseConfig = {
  apiKey: process.env.apiKey,
  authDomain: process.env.authDomain,
  projectId: process.env.projectId,
  storageBucket: process.env.storageBucket,
  messagingSenderId: process.env.messagingSenderId,
  appId: process.env.appId,
  measurementId: process.env.measurementId,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const authClient = getAuth(app);

module.exports = {
  authAdmin,
  db,
  authClient,
};
