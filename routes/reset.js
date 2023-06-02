const express = require('express')
const router = express.Router()

const { resetValues } = require('../controllers/reset')

router.post('/', resetValues)

module.exports = router