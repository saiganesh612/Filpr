const xlsx = require("xlsx")
const path = require("path");

module.exports.getExcelData = () => {
    let excelData = []
    const iplCreditsPath = path.join(path.dirname(__dirname), 'utils', 'IPL_Data.xlsx')
    const excel = xlsx.readFile(iplCreditsPath)
    for (let i = 0; i < excel.SheetNames.length; i++) {
        const temp = xlsx.utils.sheet_to_json(excel.Sheets[excel.SheetNames[i]]);
        temp.forEach(res => {
            excelData.push(res)
        })
    }
    return excelData
}
