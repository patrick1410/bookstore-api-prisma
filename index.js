// NOW WITH PRISMA!

import express from "express";
import booksRouter from "./routes/books.js";
import recordsRouter from "./routes/records.js";
import userRouter from "./routes/users.js";
import loginRouter from "./routes/login.js";
import log from "./middleware/logMiddleWare.js";
import "dotenv/config";
import { errorHandler } from "./middleware/errorHandler.js";
import * as Sentry from "@sentry/node";
import { nodeProfilingIntegration } from "@sentry/profiling-node";

const app = express();

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  integrations: [nodeProfilingIntegration()],
  // Performance Monitoring
  tracesSampleRate: 1.0, //  Capture 100% of the transactions

  // Set sampling rate for profiling - this is relative to tracesSampleRate
  profilesSampleRate: 1.0,
});

app.use(log); // Should be the first element of the chain!

app.use(express.json());

app.use("/books", booksRouter);
app.use("/records", recordsRouter);
app.use("/users", userRouter);
app.use("/login", loginRouter);

app.use(errorHandler); // Should ALWAYS be the last element of the chain!

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
