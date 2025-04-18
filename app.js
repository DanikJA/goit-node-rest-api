import express from "express";
import morgan from "morgan";
import cors from "cors";
import contactsRouter from "./routes/contactsRouter.js";
import mongoose from "mongoose";

const app = express();

const DB_HOST =
  "mongodb+srv://Danik:StZk9R_v3ajVS.-@cluster0.uhqjmpt.mongodb.net/db-contacts?retryWrites=true&w=majority&appName=Cluster0";

mongoose
  .connect(DB_HOST)
  .then(() => {
    console.log("The database is successfully connected");
    app.listen(3000, () => {
      console.log("Server is running. Use our API on port: 3000");
    });
  })
  .catch((error) => {
    console.log("Database connection error:", error.message);
    process.exit(1);
  });

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());

app.use("/api/contacts", contactsRouter);

app.use((_, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

//StZk9R_v3ajVS.-
