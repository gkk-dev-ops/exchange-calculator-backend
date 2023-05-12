const yaml = require('yamljs');
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const specs = require('./swagger-config.js');
const axios = require('axios');
const { parseString } = require('xml2js');

const app = express();
const port = 3000;
const swaggerDocument = yaml.load('docs/swagger.yml');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/api/exchange', (req, res) => {
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


app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
