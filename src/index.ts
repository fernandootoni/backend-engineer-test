import { verifyUser } from './middlewares/verifyUser'
import { router } from './routes/index'
const mysql = require('mysql')

const express = require('express')
const app = express()

app.use(express.json())

app.use(verifyUser)

app.use(router)

const conn = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'backendtest'
})

app.listen(3000)

export { conn }