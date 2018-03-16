const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient

var db

MongoClient.connect('mongodb://raekwon:wutang@ds139899.mlab.com:39899/wu-tang', (err, database) => {
  if (err) return console.log(err)
  db = database
  app.listen(process.env.PORT || 3000, () => {
    console.log('listening on 3000')
  })
})

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.static('public'))

app.get('/', (req, res) => {
  var wu = db.collection('wu').find();
  wu.toArray((err,result) =>{
        if (err) return console.log(err)
      res.render('index.ejs', {wu: result})
  })
})

app.post('/wu', (req, res) => {
  db.collection('wu').save({fortune: req.body.fortune}, (err, result) => {
    if (err) return console.log(err)
    console.log('saved to database')
    res.redirect('/')
  })
})
