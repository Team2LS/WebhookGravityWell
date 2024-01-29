const { Client } = require('pg')

const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1/rhh')
const db = mongoose.connection

async function saveRequestDeprecated(req) {
  // Connect to psql
  const client = new Client({
    "database": "rhh",
  })
  await client.connect()

  // Create a mongodb entry
  let mongo_id
  await db.collection('requests').insertOne(req)
    .then(result => {
      mongo_id = result.insertedId.toString()
    })

  // Create a psql request entry
  await client.query("INSERT INTO requests (bin_id, mongo_id, http_method, http_path) VALUES (1, $1, 'POST', 'localhost')", [mongo_id])
  await client.end()
}

async function savePayload(json) {
  let mongo_id
  await db.collection('requests').insertOne(json)
          .then(result => {
            mongo_id = result.insertedId.toString()
    })

  return mongo_id
}

async function getBinId(urlPath) {
  const client = new Client({
    "database": "rhh",
  })
  await client.connect()

  const result = await client.query("SELECT * FROM bins WHERE url_path = $1", [urlPath])

  await client.end()

  if (result.rowCount != 1) {
    return undefined
  } else {
    return result.rows[0].id
  }

}

async function saveRequest(mongoId, binId, http_method, http_path) {
  const client = new Client({
    "database": "rhh",
  })
  await client.connect()

  client.query("INSERT INTO requests (mongo_id, bin_id, http_method, http_path) VALUES ($1, $2, $3, $4)", [mongoId, binId, http_method, http_path])
}

module.exports = { saveRequest, getBinId, savePayload }