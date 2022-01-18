const { 
  insertSalesSerive, 
  findAllService, 
  findOneService, 
  updateSalesService, 
  deleteSalesService } = require('../service/salesService');
// criar sales
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

const updateSalesController = async (req, res) => {
  const itensSold = req.body;
  const { id } = req.params;
  try {
  const { sales, err } = await updateSalesService(itensSold, id);
  if (!sales) return res.status(422).json({ err });
  return res.status(200).json(sales);
  } catch (error) {
    return error.message;
  }
};

const deleteSalesController = async (req, res) => {
  const { id } = req.params;
  try {
    const { err, sale } = await deleteSalesService(id);
    if (err) return res.status(422).json({ err });
    return res.status(200).json(sale);
  } catch (error) {
    return error.message;
  }
};

module.exports = {
  insertSalesController,
  findAllController,
  findOneController,
  updateSalesController,
  deleteSalesController,
};