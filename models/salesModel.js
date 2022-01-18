const { ObjectId } = require('mongodb');
const connect = require('./connection');

const insertSalesModel = async (itensSold) => {
  const conn = await connect();
  const { ops } = await conn.collection('sales').insertMany([{
    itensSold,
  }]);
    
  return ops[0];
};

const findAllSalesModel = async () => {
  const conn = await connect();
  const sales = await conn.collection('sales').find({}).toArray();
  return sales;
};
const findOneSalesModel = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const conn = await connect();
  const sales = await conn.collection('sales').findOne({ _id: ObjectId(id) });
  return sales;
};

const updateSalesModel = async (itensSold, id) => {
  // if (!ObjectId.isValid(id)) return null;
  const conn = await connect();
  const sales = await conn.collection('sales')
  .replaceOne({ _id: ObjectId(id) }, { itensSold });
  return sales;
};

module.exports = {
  insertSalesModel,
  findAllSalesModel,
  findOneSalesModel,
  updateSalesModel,
};