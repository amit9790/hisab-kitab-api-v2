const express = require('express');
const apiRouter = express.Router();
const masterStockRouter = require('./master-stock.routes');

apiRouter.use('/master-stock', masterStockRouter);

module.exports = apiRouter;