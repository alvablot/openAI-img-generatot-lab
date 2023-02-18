const express = require('express')
const app = express()
const PORT = 5000

const axios = require('axios')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const dotenv = require('dotenv')
dotenv.config()

app.use(cors())
app.use(bodyParser.json())

const token = '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'
const config = {
  headers: { Authorization: `Bearer ${token}` },
}
const bodyData = {
  prompt: 'A cute baby sea otter',
  n: 2,
  size: '1024x1024',
}

const fetchData = async () => {
  const data = await axios.post(
    'https://api.openai.com/v1/images/generations',
    config,
    bodyData
  )
  return data.data.url
}

// setup the logger
app.use(morgan('tiny'))

async function run() {
  console.log(await fetchData())
}

run()

app.get('/', async (req, res) => {
  res.json(await fetchData())
})

app.listen(PORT, (err) => {
  if (err) console.log(err)
  console.log('Server listening on PORT', PORT)
})
