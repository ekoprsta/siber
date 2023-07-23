if(process.env.NODE_ENV !== 'production'){
  require('dotenv').config()
}

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const router = require('./routers')
const app = express()
const port = 3003

app.use(cors())
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(router)

app.listen(port, () => {
  console.log(`listening on port ${port}`);
})