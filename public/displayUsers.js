async function displayUsers() {
  const response = await fetch("http://localhost:3000/users");
  const users = await response.json();

  const userListContainer = document.querySelector(".user-list");
  userListContainer.innerHTML = "<h2>Users Available to Match</h2>"; // Clear previous content

  users.forEach((user) => {
    const userDiv = document.createElement("div");
    userDiv.classList.add("user");

    // Create elements for name and description
    const userName = document.createElement("h3");
    userName.textContent = user.name;

    const userDescription = document.createElement("p");
    userDescription.textContent =
      user.description || "No description available."; // Handle missing descriptions

    // Append name and description to the userDiv
    userDiv.appendChild(userName);
    userDiv.appendChild(userDescription);

    userListContainer.appendChild(userDiv);
  });
}

window.onload = displayUsers;
