const express = require("express");
const bodyParser = require("body-parser");
const { v4: uuidv4 } = require("uuid");

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

const users = {};

app.post("/users", (req, res) => {
  const { name, password } = req.body;
  if (!name || !password) {
    return res.status(400).json({ error: "Name and password required" });
  }
  const id = uuidv4();
  users[id] = { name, password };
  res.status(201).json({ id, name, password });
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
  const { name, password } = req.body;
  if (!users[id]) {
    return res.status(404).json({ error: "Person not found." });
  }
  if (!name && !password) {
    return res.status(400).json({
      error: "At least one field (name or password) must be provided.",
    });
  }
  users[id] = {
    name: name || users[id].name,
    password: password || users[id].password,
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

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
