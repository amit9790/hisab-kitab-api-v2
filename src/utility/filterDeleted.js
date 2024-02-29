module.exports = function getFilteredMasterStockInfo(masterStockInfo) {
    if ( !masterStockInfo) 
        return {};
    const providerInfoObject = masterStockInfo.toObject();
    // providerInfoObject.activities = providerInfoObject.activities.filter(activity => !activity.isDeleted);
    // providerInfoObject.branches = providerInfoObject.branches.filter(branch => !branch.isDeleted);
    return providerInfoObject;  
}