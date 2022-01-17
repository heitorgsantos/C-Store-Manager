const { insertSalesSerive, findAllService, findOneService } = require('../service/salesService');

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

const findAllController = async (_req, res) => {
  try {
    const sale = await findAllService();
    return res.status(200).json({ sales: sale });
  } catch (error) {
    console.log(error.message, 'entrou no catch');
  }
};

const findOneController = async (req, res) => {
  const { id } = req.params;
  try {
    const { err, sale } = await findOneService(id);
    if (err) return res.status(404).json({ err }); 
    console.log(sale);
    return res.status(200).json({ sales: sale });
  } catch (error) {
    return error.message;
  }
};

module.exports = {
  insertSalesController,
  findAllController,
  findOneController,
};