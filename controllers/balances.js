let allBalances = require('../models/balances')


const getBalance = (req,res) => {
    const accountId = req.query.account_id
    console.log(`Check account: ${accountId}`)

    currentBalance = allBalances[accountId]
    console.log(currentBalance)

    if (currentBalance) {
        res.status(200).send(String(currentBalance.balance))
    } else {
        res.status(404).send(String(0))
    }

}

module.exports = { getBalance }