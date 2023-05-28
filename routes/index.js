const express = require("express");
const router = express.Router();

const swaggerUi = require("swagger-ui-express");
const yaml = require("yamljs");
const apiRouter = require("./api/api");

const swaggerDocument = yaml.load("./docs/swagger.yml");

router.use("/api", apiRouter);

router.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

router.use("/api", apiRouter);

router.use((req, res) => {
  res.status(404).sendFile("404.html", { root: "public" });
});

module.exports = router;
