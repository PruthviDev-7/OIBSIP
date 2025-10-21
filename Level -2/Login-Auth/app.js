const title = document.getElementById("title");
const toggleBtn = document.getElementById("toggleBtn");
const submitBtn = document.getElementById("submitBtn");
const authForm = document.getElementById("authForm");
const nameField = document.getElementById("nameField");
const securePage = document.getElementById("securePage");
const displayUser = document.getElementById("displayUser");
const logoutBtn = document.getElementById("logoutBtn");

let isLogin = false;

// Switch between Register and Login
toggleBtn.addEventListener("click", () => {
  isLogin = !isLogin;
  if (isLogin) {
    title.innerText = "Login";
    submitBtn.innerText = "Login";
    toggleBtn.innerText = "Switch to Register";
  } else {
    title.innerText = "Register";
    submitBtn.innerText = "Register";
    toggleBtn.innerText = "Switch to Login";
  }
});

// Handle form submission
authForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!username || !password) {
    alert("Please fill all fields!");
    return;
  }

  if (isLogin) {
    // Login mode
    const storedUser = localStorage.getItem("username");
    const storedPass = localStorage.getItem("password");

    if (username === storedUser && password === storedPass) {
      showSecurePage(username);
    } else {
      alert("Invalid username or password!");
    }
  } else {
    // Register mode
    localStorage.setItem("username", username);
    localStorage.setItem("password", password);
    alert("Registration successful! You can now log in.");
    isLogin = true;
    title.innerText = "Login";
    submitBtn.innerText = "Login";
    toggleBtn.innerText = "Switch to Register";
  }

  authForm.reset();
});

function showSecurePage(username) {
  document.querySelector(".container").classList.add("hidden");
  securePage.classList.remove("hidden");
  displayUser.textContent = username;
}

logoutBtn.addEventListener("click", () => {
  securePage.classList.add("hidden");
  document.querySelector(".container").classList.remove("hidden");
});