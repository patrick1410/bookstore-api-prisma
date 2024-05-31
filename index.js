import express from "express";
import booksRouter from "./routes/books.js";
import recordsRouter from "./routes/records.js";

const app = express();
app.use(express.json()); // By adding this line, we're telling Express, "Hey, we're going to be sending you information in a format called JSON.

app.use("/books", booksRouter);
app.use("/records", recordsRouter); // Hier word de route /records gedefinieerd.

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
