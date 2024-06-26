import express from 'express'
const app = express()
const requestsRouter = require('./requests')
const cors = require('cors')
const morgan = require('morgan')

app.use(express.json())
app.use(cors())
app.use('/', requestsRouter)
app.use(morgan("common"))

app.use((_req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Serving running on port ${PORT}`)
})
