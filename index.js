// não remova esse endpoint, e para o avaliador funcionar
const express = require('express');
const {
  insertProducts,
  listOneProducts,
  listAllProdcts,
  updateProductsController,
  deleteProductController,
} = require('./controller/productsController');
 const {
   insertSalesController,
 } = require('./controller/salesController');

const app = express();
app.use(express.json());

const PORT = 3000;

app.get('/', (_request, response) => {
  response.send();
});

app.post('/products', insertProducts);

app.get('/products/:id', listOneProducts);

app.get('/products', listAllProdcts);

app.put('/products/:id', updateProductsController);

app.delete('/products/:id', deleteProductController);

app.post('/sales', insertSalesController);

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));
