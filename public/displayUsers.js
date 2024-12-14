async function displayUsers() {
  const response = await fetch("http://localhost:3000/users");
  const users = await response.json();

  const userListContainer = document.querySelector(".user-list");
  userListContainer.innerHTML = "<h2>Users Available to Match</h2>"; // Clear previous content

  users.forEach((user) => {
    const userDiv = document.createElement("div");
    userDiv.classList.add("user");
    userDiv.textContent = user.name;
    userListContainer.appendChild(userDiv);
  });
}

window.onload = displayUsers;
