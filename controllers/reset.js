let allBalances = require('../models/balances')

const resetValues = (req,res) => {
    console.log("Before:")
    console.log(allBalances)
    allBalances = {}
    console.log("after:")
    console.log(allBalances)
    res.status(200).send("OK")
}

module.exports = { resetValues }
