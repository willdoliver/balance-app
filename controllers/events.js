let allBalances = require('../models/balances')

const eventTypes = [
    "deposit",
    "withdraw",
    "transfer"
]

const createEvent = (req,res) => {
    const { type, origin, destination, amount } = req.body
    console.log("req.body: ")
    console.log(req.body)

    if (!eventTypes.includes(type)) {
        return res.status(404).send(String(0))
    }

    switch (type) {
        case "deposit":
            console.log("call deposit")
            depositValue(destination, amount)
            return res.status(201).json( { "destination": allBalances[destination] } )
            break
        case "withdraw":
            console.log("call withdraw")
            if (!checkAccountExists(origin) || !checkSufficientFunds(origin, amount)) {
                res.status(404).send(String(0))
            }
            withdrawValue(origin, amount)
            res.status(201).json({
                "origin": allBalances[origin]
            })
            break
        case "transfer":
            console.log("call transfer")
            if (!checkAccountExists(origin) || !checkSufficientFunds(origin, amount)) {
                res.status(404).send(String(0))
            }
            withdrawValue(origin, amount)
            depositValue(destination, amount)
            res.status(201).json({
                "origin": allBalances[origin],
                "destination": allBalances[destination]
            })
            break
        default:
            res.status(400).send(String(0))
            break
    }

}

const depositValue = (account, amount) => {
    try {
        if (allBalances[account]) {
            amount += allBalances[account].balance
        }

        allBalances[account] = {
            "id": account,
            "balance": amount
        }

        console.log("All Balances")
        console.log(allBalances)
        console.log("Current Balances")
        console.log(allBalances[account])
    } catch (error) {
        console.log("depositValue:error: " + error)
    }
}

const withdrawValue = (account, amount) => {
    try{
        console.log(allBalances)
        const currentBalance = allBalances[account].balance
        allBalances[account].balance = currentBalance - amount
    } catch (error) {
        console.log("withdrawValue:error: " + error)
    }
}

const checkAccountExists = (account) => {
    try {
        if (allBalances[account]) {
            return true
        } else {
            return false
        }
    } catch (error) {
        console.log("checkAccountExists:error: " + error)
        return false
    }
}

const checkSufficientFunds = (originAccount, amount) => {
    try {
        value = allBalances[originAccount].balance

        if (value < amount) {
            return false
        } else {
            return true
        }
    } catch (error) {
        console.log("checkSufficientFunds:error: " + error)
        return false
    }
}

module.exports = { createEvent }
