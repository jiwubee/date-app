// Wait for the DOM to fully load before executing any script
document.addEventListener("DOMContentLoaded", () => {
  // Get DOM elements
  const accountButton = document.getElementById("accountButton");
  const popup = document.getElementById("popup");
  const closeBtn = document.getElementById("closeBtn");
  const loginForm = document.getElementById("loginForm");
  const registerForm = document.getElementById("registerForm");
  const toRegister = document.getElementById("toRegister");
  const toLogin = document.getElementById("toLogin");
  const block = document.getElementById("block");

  accountButton.addEventListener("click", () => {
    popup.style.display = "block";
  });

  closeBtn.addEventListener("click", () => {
    popup.style.display = "none";
  });

  // Switch to the registration form
  toRegister.addEventListener("click", () => {
    loginForm.style.display = "none";
    registerForm.style.display = "block";
  });

  // Switch to the login form
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
  const registerButton = document.getElementById("registerButton");
  if (registerButton) {
    registerButton.addEventListener("click", async () => {
      const username = document.getElementById("registerUsername").value;
      const password = document.getElementById("registerPassword").value;
      const description = document.getElementById("registerDescription").value;

      if (!username || !password) {
        alert("Both username and password are required!");
        return;
      }

      try {
        const response = await fetch("http://localhost:3000/users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: username, password, description }),
        });

        const data = await response.json();

        if (response.status === 201) {
          alert("Registration successful!");
          localStorage.setItem("userId", data.id); // Save user ID
          popup.style.display = "none"; // Close the popup
          block.style.display = "none"; // Hide the block
        } else {
          alert(data.error || "Registration failed.");
        }
      } catch (error) {
        console.error("Error during registration:", error);
        alert("An error occurred. Please try again.");
      }
    });
  }

  // Login user
  const loginButton = document.getElementById("loginButton");
  if (loginButton) {
    loginButton.addEventListener("click", async () => {
      const username = document.getElementById("loginUsername").value;
      const password = document.getElementById("loginPassword").value;

      try {
        const response = await fetch("http://localhost:3000/users");
        const users = await response.json();

        const user = users.find(
          (u) => u.name === username && u.password === password
        );

        if (user) {
          alert("Login successful!");
          localStorage.setItem("userId", user.id); // Save user ID
          popup.style.display = "none"; // Close the popup
          block.style.display = "none"; // Hide the block
        } else {
          alert("Invalid username or password.");
        }
      } catch (error) {
        console.error("Error during login:", error);
        alert("An error occurred. Please try again.");
      }
    });
  }
});
