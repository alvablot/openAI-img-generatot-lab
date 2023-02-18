const { Configuration, OpenAIApi } = require('openai')
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
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})
const openai = new OpenAIApi(configuration)
async function fetchData(request) {
  const response = await openai.createImage({
    prompt: request,
    n: 2,
    size: '1024x1024',
  })
  if (response.data.data) return response.data.data
  else return
}

app.get('/', async (req, res, next) => {
  try {
    console.log(req.query.request)
    res.json(await fetchData(req.query.request))
  } catch (error) {
    return next(error)
  }
})

app.use((err, req, res, next) => {
  res.status(500).send({ error: err.message })
})

app.listen(PORT, (err) => {
  if (err) console.log(err)
  console.log('Server listening on PORT', PORT)
})
