const { insertSalesSerive } = require('../service/salesService');

const insertSalesController = async (req, res, _next) => {
  const itensSold = req.body;
  
  try {
    const { err, status, sales } = await insertSalesSerive(itensSold);
    if (err) return res.status(status).json({ err });
    return res.status(200).json(sales); 
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  insertSalesController,
};