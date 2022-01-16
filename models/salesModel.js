const connect = require('./connection');

const insertSalesModel = async (itensSold) => {
  const conn = await connect();
  const { ops } = await conn.collection('sales').insertMany([{
    itensSold,
  }]);
    
  return ops[0];
};

module.exports = {
  insertSalesModel,
};