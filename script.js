import { initializeApp } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";
import {
  getFirestore,
  doc,
  setDoc,
  getDoc
} from "https://www.gstatic.com/firebasejs/12.2.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCkIDDZPZW2wUyxxYI8uN-lpGv58m0LTS8",
  authDomain: "shade-85.firebaseapp.com",
  projectId: "shade-85",
  storageBucket: "shade-85.firebasestorage.app",
  messagingSenderId: "370950187569",
  appId: "1:370950187569:web:aa8f05b3ef8a0f1bd54310",
  measurementId: "G-WJNJ2HEMLT"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

document.getElementById("registerBtn").onclick = async () => {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  const msg = document.getElementById("msg");

  if (!username || !password) {
    msg.innerText = "Username aur Password bhariye!";
    return;
  }

  const ref = doc(db, "users", username);
  const snap = await getDoc(ref);

  if (snap.exists()) {
    msg.innerText = "Username pehle se hai!";
    return;
  }

  await setDoc(ref, { password });

  msg.style.color = "green";
  msg.innerText = "Account ban gaya!";
};

document.getElementById("loginBtn").onclick = async () => {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  const msg = document.getElementById("msg");

  const ref = doc(db, "users", username);
  const snap = await getDoc(ref);

  if (!snap.exists()) {
    msg.innerText = "Username nahi mila!";
    return;
  }

  if (snap.data().password !== password) {
    msg.innerText = "Galat Password!";
    return;
  }

  localStorage.setItem("currentUser", username);
  window.location.href = "chat.html";
};
