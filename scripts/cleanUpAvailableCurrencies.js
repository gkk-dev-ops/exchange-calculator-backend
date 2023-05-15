const fs = require('fs');
const availableCurrenciesPath = './config/availableCurrencies.json'

// Read array from file
fs.readFile(availableCurrenciesPath, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading file:', err);
    return;
  }

  const array = JSON.parse(data);

  // Remove duplicates
  const uniqueArray = [...new Set(array)];

  // Output unique array
  const output = JSON.stringify(uniqueArray);
  fs.writeFile(availableCurrenciesPath, output, 'utf8', (err) => {
    if (err) {
      console.error('Error writing file:', err);
      return;
    }
    console.log(`Unique array has been written to ${availableCurrenciesPath}`);
  });

});
