const express = require("express");
const { readdirSync } = require("fs");
const router = require("./routes/auth");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config(); 

mongoose
  .connect(process.env.DATABASE)
  .then(() => console.log("db connected"))
  .catch((err) => console.log("db connection error", err));

const app = express();

app.use(morgan("dev"));
app.use(express.json())

// app.post("/api/register", (req, res) => {
//   console.log("Connected to React");
  
// });

// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "YOUR-DOMAIN.TLD"); // update to match the domain you will make the request from
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

app.use(cors())
readdirSync("./routes").map((r) => app.use("/api", require(`./routes/${r}`)));
app.use("/api", router);

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`server is running on port ${port}`));
