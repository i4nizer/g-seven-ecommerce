const express = require('express')
const app = express()
const authenticationRoutes = require('./routes/authentication')


app.set('view engine', 'ejs')
app.use(express.static('public'))

app.get('/', (req, res) => res.render('index'))
app.use('/authentication', authenticationRoutes)


const port = 3000
app.listen(port, () => console.log(`Server running on http://localhost:${port}`))