import express from "express";
import booksRouter from "./routes/books.js";
import recordsRouter from "./routes/records.js";
import loginRouter from "./routes/login.js";
import log from "./middleware/logMiddleWare.js";
import "dotenv/config";

const app = express();
app.use(express.json());

app.use(log);

app.use("/books", booksRouter);
app.use("/records", recordsRouter);
app.use("/login", loginRouter);

app.get("/about", (req, res) => {
  const html = "<h1>About Us</h1><p>Welcome to our website!</p>";
  res.send(html);
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
