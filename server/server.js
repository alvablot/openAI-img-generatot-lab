const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')
const dotenv = require('dotenv')

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(bodyParser.json())
app.use(morgan('tiny'))

app.use('/', require('./routes/data.router'))
app.use('/caracters/', require('./routes/caracters.router'))

app.use((err, req, res, next) => {
  res.status(500).send({ error: err.message })
})

app
  .listen(PORT, console.log(`Server listening on PORT ${PORT}`))
  .on('error', (err) => console.log(err))
