//mongod.exe --dbpath c:\data\db

const connect_to_mongo = require('./db');
const express = require('express')
var cors = require('cors')

connect_to_mongo();
const app = express()
const port = 5000


app.use(cors())
app.use(express.json())

//Available Routers
app.use('/api/auth' ,require('./routers/auth'))
app.use('/api/notes',require('./routers/notes'))


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})