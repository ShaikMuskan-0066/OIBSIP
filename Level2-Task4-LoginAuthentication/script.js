const loginForm = document.getElementById("loginForm");
const signupForm = document.getElementById("signupForm");

const loginMessage = document.getElementById("loginMessage");
const signupMessage = document.getElementById("signupMessage");


// Show Signup Form

function showSignup() {
    loginForm.classList.add("hidden");
    signupForm.classList.remove("hidden");

    document.querySelector(".subtitle").classList.add("hidden");
    document.querySelector(".auth-card h1").classList.add("hidden");

    document.querySelector(".switch-text").classList.add("hidden");
    document.getElementById("backToLogin").classList.remove("hidden");

    loginMessage.textContent = "";
}


// Show Login Form

function showLogin() {
    signupForm.classList.add("hidden");
    loginForm.classList.remove("hidden");

    document.querySelector(".subtitle").classList.remove("hidden");
    document.querySelector(".auth-card h1").classList.remove("hidden");

    document.querySelector(".switch-text").classList.remove("hidden");
    document.getElementById("backToLogin").classList.add("hidden");

    signupMessage.textContent = "";
}


// Signup

if (signupForm) {

    signupForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const name = document.getElementById("signupName").value;
        const email = document.getElementById("signupEmail").value;
        const password = document.getElementById("signupPassword").value;

        if (password.length < 6) {
            signupMessage.textContent =
                "Password must contain at least 6 characters.";

            signupMessage.style.color = "red";

            return;
        }

        const user = {
            name: name,
            email: email,
            password: password
        };

        localStorage.setItem("user", JSON.stringify(user));

        signupMessage.textContent =
            "Account created successfully. Please login.";

        signupMessage.style.color = "green";

        signupForm.reset();

        setTimeout(showLogin, 1200);

    });

}


// Login

if (loginForm) {

    loginForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const email = document.getElementById("loginEmail").value;
        const password = document.getElementById("loginPassword").value;

        const savedUser = JSON.parse(localStorage.getItem("user"));

        if (!savedUser) {

            loginMessage.textContent =
                "No account found. Please create an account first.";

            loginMessage.style.color = "red";

            return;
        }

        if (
            email === savedUser.email &&
            password === savedUser.password
        ) {

            localStorage.setItem("loggedIn", "true");

            window.location.href = "dashboard.html";

        } else {

            loginMessage.textContent =
                "Invalid email or password.";

            loginMessage.style.color = "red";

        }

    });

}


// Dashboard Login Check

if (window.location.pathname.includes("dashboard.html")) {

    const loggedIn = localStorage.getItem("loggedIn");
    const savedUser = JSON.parse(localStorage.getItem("user"));

    if (loggedIn !== "true" || !savedUser) {

        window.location.href = "index.html";

    } else {

        const welcomeMessage =
            document.getElementById("welcomeMessage");

        welcomeMessage.textContent =
            "Welcome, " + savedUser.name +
            "! You are successfully logged in.";

    }

}


// Logout

function logout() {

    localStorage.removeItem("loggedIn");

    window.location.href = "index.html";

}