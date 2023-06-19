const connectToMongo = require("./db");
connectToMongo(); //  connecting to database
const express = require("express");
var cors = require("cors");

const app = express();
const port = 5000;

app.get("/", (req, res) => {
  res.send("hello world");
});

// to use req.body, we have to use this middleware
app.use(express.json());
app.use(cors());

// Available routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));

app.listen(port, () => {
  console.log(`NotesManager listening at http://localhost:${port}`);
});
