const express = require('express')
const app = express();
const connectDB = require('./config/db')
app.use(express.json({ extented: false }))
const port = process.env.PORT || 3000
const bodyParser = require('body-parser')
// setting view engine
const exphbs = require('express-handlebars')
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// setting bodyParser
app.use(bodyParser.urlencoded({ extended: true }))

// setting static files
app.use(express.static('public'))

//connect to mongodb
connectDB()


// setting routes

app.use('/', require('./routes/index'))
app.use('/api/url', require('./routes/url'))

app.listen(port, () => {
  console.log(`you are now listening at port ${port}`);
})