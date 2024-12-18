const express = require("express");
const bodyParser = require("body-parser");
const { v4: uuidv4 } = require("uuid");
const cors = require("cors");
const path = require("path"); // Required for resolving file paths

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(cors());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, "public")));

// Users API
const users = {
  1: {
    name: "Ania",
    password: "password123",
    description: "sympatyczna programistka",
  },
  2: {
    name: "Robert",
    password: "securepassword456",
    description: "Enjoys playing chess.",
  },
  3: {
    name: "Czarek",
    password: "charlie123",
    description: "Student medycyny",
  },
  4: {
    name: "Arek",
    password: "kochamlinux123",
    description: "Fanatyk linuxa",
  },
  5: {
    name: "Marek",
    password: "marek",
    description: "sympatyczny informatyk",
  },
};

app.post("/users", (req, res) => {
  const { name, password, description = "" } = req.body;
  if (!name || !password) {
    return res.status(400).json({ error: "Name and password required" });
  }
  const id = uuidv4();
  users[id] = { name, password, description };
  res.status(201).json({ id, name, password, description });
});

app.get("/users/:id", (req, res) => {
  const { id } = req.params;
  if (!users[id]) {
    return res.status(404).json({ error: "Person not found." });
  }
  res.json({ id, ...users[id] });
});

app.put("/users/:id", (req, res) => {
  const { id } = req.params;
  const { name, password, description } = req.body;
  if (!users[id]) {
    return res.status(404).json({ error: "Person not found." });
  }
  if (!name && !password && description === undefined) {
    return res.status(400).json({
      error:
        "At least one field (name, password, or description) must be provided.",
    });
  }
  users[id] = {
    name: name || users[id].name,
    password: password || users[id].password,
    description:
      description !== undefined ? description : users[id].description,
  };
  res.json({ id, ...users[id] });
});

app.delete("/users/:id", (req, res) => {
  const { id } = req.params;
  if (!users[id]) {
    return res.status(404).json({ error: "Person not found." });
  }
  delete users[id];
  res.status(204).send();
});

// Serve index.html on the root URL
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Endpoint to get all users
app.get("/users", (req, res) => {
  const allUsers = Object.keys(users).map((id) => ({
    id,
    ...users[id],
  }));
  res.json(allUsers);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
