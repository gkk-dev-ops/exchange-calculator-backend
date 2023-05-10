const express = require('express');
const axios = require('axios');
const { parseString } = require('xml2js');
const app = express();
const port = 3000;

// Middleware to fetch XML from remote URL, parse it, and return as JSON
app.get('/exchange', (req, res) => {
    axios.get('https://static.nbp.pl/dane/kursy/xml/en/23a087en.xml')
      .then(response => {
        parseString(response.data, (err, result) => {
          if (err) {
            res.status(500).send({ error: 'Error parsing XML' });
          } else {
            res.send(result);
          }
        });
      })
      .catch(error => {
        res.status(500).send({ error: 'Error fetching XML' });
      });
  });


// Start server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
