// Get DOM elements
const accountButton = document.getElementById("accountButton");
const popup = document.getElementById("popup");
const closeBtn = document.getElementById("closeBtn");
const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");
const toRegister = document.getElementById("toRegister");
const toLogin = document.getElementById("toLogin");
const block = document.getElementById("block");

// Check if the user is logged in and show the appropriate content
function checkLoginStatus() {
  const userId = localStorage.getItem("userId");

  if (userId) {
    // User is logged in, show matches
    document.getElementById("matches").style.display = "block";
    document.getElementById("notLoggedIn").style.display = "none";
  } else {
    // User is not logged in, show "not logged in" message
    document.getElementById("matches").style.display = "none";
    document.getElementById("notLoggedIn").style.display = "block";
  }
}

window.onload = checkLoginStatus;

accountButton.addEventListener("click", () => {
  popup.style.display = "block";
});

closeBtn.addEventListener("click", () => {
  popup.style.display = "none";
});

toRegister.addEventListener("click", () => {
  loginForm.style.display = "none";
  registerForm.style.display = "block";
});

toLogin.addEventListener("click", () => {
  registerForm.style.display = "none";
  loginForm.style.display = "block";
});

window.addEventListener("click", (e) => {
  if (e.target === popup) {
    popup.style.display = "none";
  }
});

// Register user
document
  .getElementById("registerButton")
  .addEventListener("click", async () => {
    const username = document.getElementById("registerUsername").value;
    const password = document.getElementById("registerPassword").value;

    // Make sure both fields are filled
    if (!username || !password) {
      alert("Both username and password are required!");
      return;
    }

    // Send the registration data to the backend
    const response = await fetch("http://localhost:3000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: username, password: password }),
    });

    const data = await response.json();

    // Check the response
    if (response.status === 201) {
      alert("Registration successful!");
      localStorage.setItem("userId", data.id); // Save user ID
      popup.style.display = "none"; // Close the popup
      block.style.display = "none";
    } else {
      alert(data.error);
    }
  });
// Login user
document.getElementById("loginButton").addEventListener("click", async () => {
  const username = document.getElementById("loginUsername").value;
  const password = document.getElementById("loginPassword").value;

  // Get the userId from localStorage
  const userId = localStorage.getItem("userId");
  if (!userId) {
    alert("No user logged in");
    return;
  }

  // Fetch user data by ID
  const response = await fetch(`http://localhost:3000/users/${userId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const user = await response.json();

  if (response.ok && user.name === username && user.password === password) {
    alert("Login successful!");
    popup.style.display = "none"; // Close the popup
    api.style.display = "none"; // Hide the box
  } else {
    alert("Invalid username or password");
  }
});
function updateAccount() {
  app.put("/users/:id", (req, res) => {
    const { id } = req.params;
    const { name, age, description } = req.body;

    if (!users[id]) {
      return res.status(404).json({ error: "Person not found." });
    }

    if (!name && !age && !description) {
      return res.status(400).json({
        error:
          "At least one field (name, age, or description) must be provided.",
      });
    }

    users[id] = {
      name: name || users[id].name,
      age: age || users[id].age,
      description:
        description !== undefined ? description : users[id].description,
    };

    res.json({ id, ...users[id] });
  });
}
