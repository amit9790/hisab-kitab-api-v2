const express = require('express');
const masterStockRouter = express.Router();
const masterStockController = require('../controller/master-stock.controller');

masterStockRouter.get('/:id', masterStockController.getStock);
masterStockRouter.get('/', masterStockController.getStocks);
masterStockRouter.post('/', masterStockController.saveStock);
masterStockRouter.put('/:id', masterStockController.updateStock);
masterStockRouter.delete('/:id', masterStockController.deleteStock);

module.exports = masterStockRouter;