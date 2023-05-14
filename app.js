const apiRouter = require("./routes/api");
const swaggerUi = require("swagger-ui-express");
const yaml = require("yamljs");
const express = require("express");

const app = express();
const port = 3000;
const swaggerDocument = yaml.load("docs/swagger.yml");

app.use(express.static("public"));

app.use("/api-docs", swaggerUi.setup(swaggerDocument));

app.use("/api", apiRouter);

app.use((req, res) => {
  res.status(404).sendFile("404.html", { root: "public" });
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
