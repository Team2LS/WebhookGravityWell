import * as express from 'express';
const requestsRouter = express.Router()
import { Payload, saveRequest, getBinId, savePayload, getRequestById, getAllRequests } from './services/db'

requestsRouter.get('/', (req, res) => {
  Payload.find({}).then(requests => {
    res.json(requests)
  })
})

requestsRouter.post('/', async(req, res) => {
  let urlPath

  if (req.headers.host === undefined) {
    res.status(400).send()
    return undefined
  } else {
    urlPath = req.headers.host.split('.')[0]
  }

  const binId = await getBinId(urlPath)

  if (urlPath.split('.')[0] == undefined) {
    res.status(400).send()
  }

  if (binId) {
    const mongoId = await savePayload(req.body)
    await saveRequest(mongoId, binId, "POST", urlPath)
    console.log("Created new webhook entry", urlPath, binId, mongoId)
    res.status(202).send()
  } else {
    res.status(400).send()
  }
})

module.exports = requestsRouter