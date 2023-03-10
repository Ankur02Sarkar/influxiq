const express = require("express");
const notes = require("./data/notes");
const app = express();
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const noticeRoutes = require("./routes/noticeRoutes");
const { notFound } = require("./middleware/errorMiddleware");
const { errorHandler } = require("./middleware/errorMiddleware");
const path = require("path");
dotenv.config();
connectDB();
app.use(express.json());

app.get("/api/notice", (req, res) => {
  res.json(notes);
});
app.get("/api/notice/:id", (req, res) => {
  const note = notes.find((n) => n._id === req.params.id);
  res.send(note);
});
app.use("/api/users", userRoutes);
app.use("/api/notices", noticeRoutes);

//////////////////////////////////////
__dirname = path.resolve();
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("API is Live");
  });
}
//////////////////////////////////////

app.use(notFound);
app.use(errorHandler);
app.listen(
  process.env.PORT || 5000,
  console.log(`Server started on PORT ${process.env.PORT || 5000}`)
);
