const fs = require("fs/promises");

async function readCurrencies(file) {
  try {
    const data = await fs.readFile(file, "utf8");
    const jsonData = JSON.parse(data);
    const currencies = jsonData[0].rates.map((currency) => currency.code);
    return currencies;
  } catch (error) {
    console.error("Error reading or parsing the file:", error);
    return [];
  }
}

async function processFiles(files) {
  let availableCurrencies = [];

  for (const file of files) {
    const currencies = await readCurrencies(file);
    availableCurrencies = availableCurrencies.concat(currencies);
  }

  return availableCurrencies;
}

processFiles(["a.json", "b.json", "c.json"])
  .then((availableCurrencies) => {
    const jsonString = JSON.stringify(availableCurrencies, null, 2);

    fs.writeFile("allCurrencies.json", jsonString, "utf8")
      .then(() => {
        console.log("Data has been written to file successfully.");
      })
      .catch((error) => {
        console.error("Error writing to file:", error);
      });
  })
  .catch((error) => {
    console.error("Error processing files:", error);
  });
