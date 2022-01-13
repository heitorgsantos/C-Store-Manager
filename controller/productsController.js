const productsService = require('../service/productsService');

const insertProducts = async (req, res, _next) => {
  const { name, quantity } = req.body;
  
  try {
    const { err, status, product } = await productsService.createProducts(name, quantity);
    console.log(err);
    if (err) return res.status(status).json({ err });
    return res.status(201).json(product); 
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  insertProducts,
};