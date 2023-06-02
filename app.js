require('dotenv').config()

const express = require('express')
const app = express()

// Importing routes
const balanceRouter = require('./routes/balances')
const eventsRouter = require('./routes/events')
const resetRouter = require('./routes/reset')

const port = process.env.PORT || 3000

// To receive Json through APIs
app.use(express.json())

// Routes
app.use('/balance', balanceRouter)
app.use('/event', eventsRouter)
app.use('/reset', resetRouter)

const start = async() => {
    try {
        app.listen(port, console.log(`server is listening on port ${port}...`))
    } catch (error) {
        console.log(error)
    }
}

start()
