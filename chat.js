const currentUser = localStorage.getItem("currentUser");

if (!currentUser) {
    window.location.href = "index.html";
}

document.getElementById("welcome").innerText =
"Welcome, " + currentUser;

let messages = JSON.parse(localStorage.getItem("messages")) || [];

const chatBox = document.getElementById("chatBox");

function showMessages() {

    chatBox.innerHTML = "";

    messages.forEach(function(msg){

        let p = document.createElement("p");
        p.innerText = msg.user + " : " + msg.text;

        chatBox.appendChild(p);

    });

    chatBox.scrollTop = chatBox.scrollHeight;

}

showMessages();

document.getElementById("sendBtn").onclick = function(){

    const text = document.getElementById("message").value.trim();

    if(text==="") return;

    messages.push({
        user: currentUser,
        text: text
    });

    localStorage.setItem("messages", JSON.stringify(messages));

    document.getElementById("message").value="";

    showMessages();

};

document.getElementById("logoutBtn").onclick = function(){

    localStorage.removeItem("currentUser");

    window.location.href="index.html";

};