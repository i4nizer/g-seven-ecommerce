const express = require('express')
const app = express()
const router = require('./routes/router')


app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use('/', router)


const port = 3000
app.listen(port, () => console.log(`Server running on http://localhost:${port}`))