// não remova esse endpoint, e para o avaliador funcionar
const express = require('express');
const { insertProducts } = require('./controller/productsController');

const app = express();
app.use(express.json());

const PORT = 3000;

app.get('/', (_request, response) => {
  response.send();
});

app.post('/products', insertProducts);

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));
