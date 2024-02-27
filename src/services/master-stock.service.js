const masterStockModel = require('../model/master-stock.model');

/**
 * 
 * @returns Stocks List
 */
exports.getStocks = async () => {
    try {
        return await masterStockModel.find({}).sort({ createdAt: -1 });
    } catch (e) {
        throw Error(e.errmsg || e.message || 'Error occurred');
    }
}

/**
 * 
 * @param {stockId} id 
 * @returns single stock
 */
exports.getStock = async (id) => {
    try {
        return await masterStockModel.findOne({ _id: id });
    } catch (e) {
        throw Error(e.errmsg || e.message || 'Error occurred');
    }
}

/**
 * 
 * @param {new stock data} data 
 * @returns save response of stock
 */
exports.saveStock = async (data) => {
    try {
        // data['createdBy'] = 'XYZ';
        // data['modifiedBy'] = 'XYZ'; // TODO: these fields will be added once auth service is designed and integrated

        return await masterStockModel(data).save();
    } catch (e) {
        throw Error(e.errmsg || e.message || 'Error occurred');
    }
}

/**
 * 
 * @param {stock id} id 
 * @returns null
 */
exports.deleteStock = async (id) => {
    try {
        return await masterStockModel.findByIdAndRemove({ _id: id });
    } catch (e) {
        throw Error(e.errmsg || e.message || 'Error occurred');
    }
}

/**
 * 
 * @param {stock id} id 
 * @param {stock data} data 
 * @returns null
 */
exports.updateStock = async (id, data) => {
    try {
        return await masterStockModel.updateOne({
            _id: id
        }, {
            $set: data
        });
    } catch (e) {
        throw Error(e.errmsg || e.message || 'Error occurred');
    }
}