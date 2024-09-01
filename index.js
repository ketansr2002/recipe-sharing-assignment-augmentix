const express = require("express");
const connectDB = require("./config/db");
const dotenv = require("dotenv");
dotenv.config();
const app = express();
const recipeRouter = require("./routes/recipeRoutes");
const cors = require("cors");

app.use(express.json());
app.use(cors());
app.use("/api", recipeRouter);

app.get("/", (req, res) => {
  res.send("<h1>hello bubssy</h2>");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Frontend is Running on port ${3000}`);
  await connectDB();
});
