const express = require('express')
const router = express.Router()

const {
    getBalance
} = require('../controllers/balances')

router.get('/', getBalance)

module.exports = router