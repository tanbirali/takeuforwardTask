const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();

app.use(cors());
app.use(express.json());
const flashCardsRouter = require("../routes/flashCard");

const port = process.env.PORT ? process.env.PORT : 8000;
app.get("/:id", (req, res) => {
  const { id } = req.params;
  res.send(`You are ${id}`);
});
app.use("/api", flashCardsRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
