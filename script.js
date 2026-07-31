let users = JSON.parse(localStorage.getItem("users")) || {};

document.getElementById("registerBtn").onclick = function () {

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
    const msg = document.getElementById("msg");

    if (username === "" || password === "") {
        msg.innerText = "Username aur Password bhariye!";
        return;
    }

    if (users[username]) {
        msg.innerText = "Username pehle se hai!";
        return;
    }

    users[username] = password;
    localStorage.setItem("users", JSON.stringify(users));

    msg.style.color = "green";
    msg.innerText = "Account ban gaya!";
};

document.getElementById("loginBtn").onclick = function () {

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
    const msg = document.getElementById("msg");

    let users = JSON.parse(localStorage.getItem("users")) || {};

    if (users[username] && users[username] === password) {

        localStorage.setItem("currentUser", username);

        msg.style.color = "green";
        msg.innerText = "Login Successful!";

        setTimeout(function () {
            window.location.href = "chat.html";
        }, 500);

    } else {

        msg.style.color = "red";
        msg.innerText = "Galat Username ya Password!";

    }

};