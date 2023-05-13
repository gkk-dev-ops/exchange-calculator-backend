const yaml = require("yamljs");
const express = require("express");
const axios = require("axios");
const availableCurrencies = require("./config/availableCurrencies.json");
const utils = require("./utils/utils");

const app = express();
const port = 3000;
const swaggerDocument = yaml.load("docs/swagger.yml");

// Serve static files from the 'public' directory
app.use(express.static("public"));

app.get("/api/availableCurrencies", (req, res) => {
  res.status(200).send(availableCurrencies);
});

app.get("/api/exchange/:currency/:currency2", async (req, res) => {
  const { currency, currency2 } = req.params;
  let baseCurrencyData, targetCurrencyData;

  if (currency === "PLN") {
    baseCurrencyData = {
      currency: "Polski Złoty",
      code: "PLN",
      mid: 1,
    };
  }
  if (currency2 === "PLN") {
    targetCurrencyData = {
      currency: "Polski Złoty",
      code: "PLN",
      mid: 1,
    };
  }
  try {
    const [tableAData, tableBData] = await Promise.all([
      axios.get("https://api.nbp.pl/api/exchangerates/tables/A?format=json"),
      axios.get("https://api.nbp.pl/api/exchangerates/tables/B?format=json"),
    ]);

    const currenciesData = [
      ...tableAData.data[0].rates,
      ...tableBData.data[0].rates,
    ];

    if (!baseCurrencyData) {
      baseCurrencyData = currenciesData.find(
        (currencyData) => currencyData.code === currency
      );
    }
    if (!targetCurrencyData) {
      targetCurrencyData = currenciesData.find(
        (currencyData) => currencyData.code === currency2
      );
    }

    if (!baseCurrencyData || !targetCurrencyData) {
      res.status(404).json({ error: "Currency not found" });
      return;
    }

    const exchangeRate = utils.calculateExchangeRate(
      baseCurrencyData,
      targetCurrencyData
    );

    // Prepare the response data
    const data = {
      currency: currency,
      currency2: currency2,
      exchangeRate: exchangeRate,
    };

    // Send the response back to the client
    res.json(data);
  } catch (error) {
    console.error("Error processing exchange rate:", error);
    res.status(500).json({ error: "Failed to process exchange rate" });
  }
});

// Custom 404 page
app.use((req, res) => {
  res.status(404).sendFile("404.html", { root: "public" });
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
