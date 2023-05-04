import { router } from './routes/index'
const mysql = require('mysql')

const express = require('express')
const app = express()

app.use(express.json())
app.use(router)

const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'backendtest'
})

conn.connect(function(err: string) {
  if(err) {
    console.log(err)
  }

  console.log('Conectou ao MySQL')
})

app.listen(3000)

export { conn }