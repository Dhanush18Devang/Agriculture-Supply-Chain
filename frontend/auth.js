function register() {
  const username = document.getElementById("regUsername").value;
  const password = document.getElementById("regPassword").value;

  if (username && password) {
    localStorage.setItem("user", JSON.stringify({ username, password }));
    alert("Registration successful!");
    window.location.href = "login.html";
  } else {
    alert("Please fill all fields.");
  }
}

function login() {
  const username = document.getElementById("loginUsername").value;
  const password = document.getElementById("loginPassword").value;
  const storedUser = JSON.parse(localStorage.getItem("user"));

  if (storedUser && username === storedUser.username && password === storedUser.password) {
    localStorage.setItem("loggedIn", "true");
    alert("Login successful!");
    window.location.href = "home.html";
  } else {
    alert("Invalid credentials.");
  }
}

function logout() {
  localStorage.removeItem("loggedIn");
  window.location.href = "login.html";
}

function checkAuth() {
  if (localStorage.getItem("loggedIn") !== "true") {
    window.location.href = "login.html";
  }
}
