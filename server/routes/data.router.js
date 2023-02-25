const express = require('express')
const { Configuration, OpenAIApi } = require('openai')

const router = express.Router()
const dotenv = require('dotenv')
dotenv.config()

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})
const openai = new OpenAIApi(configuration)

async function fetchData(request) {
  const response = await openai.createImage({
    prompt: request,
    n: 2,
    size: '512x512',
  })
  return response.data.data
}

router.get('/', async (req, res, next) => {
  try {
    res.json(await fetchData(req.query.request))
  } catch (error) {
    return next(error)
  }
})

module.exports = router
