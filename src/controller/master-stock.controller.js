const masterStockService = require('../services/master-stock.service');

exports.getStocks = async (req, res, next) => {
    try {
        const data = await masterStockService.getStocks();
        return res.status(200).json({
            data: data,
            status: 200,
            message: 'Stocks fetched successfully'
        })
    } catch (e) {
        return res.status(500).json({
            status: 500,
            message: e.message
        });
    }
}

exports.getStock = async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = await masterStockService.getStock(id);
        return res.status(200).json({
            data: data,
            status: 200,
            message: 'Stock fetched successfully'
        })
    } catch (e) {
        return res.status(500).json({
            status: 500,
            message: e.message
        });
    }
}

exports.saveStock = async (req, res, next) => {
    try {
        const stockData = req.body;
        await masterStockService.saveStock(stockData);
        return res.status(200).json({
            status: 200,
            message: 'Stock created successfully'
        })
    } catch (e) {
        return res.status(500).json({
            status: 500,
            message: e.message
        });
    }
}

exports.deleteStock = async (req, res, next) => {
    try {
        const id = req.params.id;
        await masterStockService.deleteStock(id);
        return res.status(200).json({
            status: 200,
            message: 'Stock deleted successfully'
        })
    } catch (e) {
        return res.status(500).json({
            status: 500,
            message: e.message
        });
    }
}

exports.updateStock = async (req, res, next) => {
    try {
        const id = req.params.id;
        const stockData = req.body;
        await masterStockService.updateStock(id, stockData);
        return res.status(200).json({
            status: 200,
            message: 'Stock updated successfully'
        })
    } catch (e) {
        return res.status(500).json({
            status: 500,
            message: e.message
        });
    }
}