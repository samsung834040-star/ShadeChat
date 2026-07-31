import { initializeApp } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot
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

const currentUser = localStorage.getItem("currentUser");

if (!currentUser) {
  location.href = "index.html";
}

document.getElementById("welcome").innerText = "Welcome, " + currentUser;

const chatBox = document.getElementById("chatBox");

const q = collection(db, "messages");

onSnapshot(q, (snapshot) => {
  chatBox.innerHTML = "";
  snapshot.forEach((doc) => {
    const data = doc.data();
    chatBox.innerHTML += `<p><b>${data.user}:</b> ${data.text}</p>`;
  });
  chatBox.scrollTop = chatBox.scrollHeight;
});

document.getElementById("sendBtn").onclick = async () => {
  const text = document.getElementById("message").value.trim();
  if (!text) return;

  await addDoc(collection(db, "messages"), {
    user: currentUser,
    text: text,
    time: Date.now()
  });

  document.getElementById("message").value = "";
};

document.getElementById("logoutBtn").onclick = () => {
  localStorage.removeItem("currentUser");
  location.href = "index.html";
};
