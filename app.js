const router = require("./routes/index");
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const app = express();
const port = dotenv.config().parsed.PORT || 3000;
app.use(cors());

app.use(express.static("public"));
app.use("/", router);

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
