//library
const express = require('express')
const bcrypt = require('bcrypt-nodejs')
const cors = require('cors')
const knex = require('knex')

//controller
const register = require('./controller/register')
const signin = require('./controller/signin')
const profile = require('./controller/profile')
const order = require('./controller/order')
const itemlist = require('./controller/itemlist')
const track = require('./controller/track')


//initialize backend
const app = express()
const db = knex({
    client: 'pg',
    connection: {
      host : '192.168.1.98',
      user : 'postgres',
      password : 'postgres',
      database : 'postgres'
    }
});
app.use(express.json())
app.use(cors())

app.post('/signin', signin.handleSignIn(db, bcrypt))
app.post('/register', register.handleRegister(db, bcrypt))
app.get('/profile/:id', profile.handleProfile(db))
app.post('/order', order.handleOrder(db))
app.post('/itemlist', itemlist.handleItemList(db))
app.post('/track', track.handleTrack(db))

app.listen(process.env.PORT || 3001, () => {
    console.log(`app is running on port ${process.env.PORT}`)
})