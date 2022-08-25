const express = require('express')
const app = new express()
const cors = require('cors')
require('dotenv').config({path: '.env.local'})

const collectionRouter = require('./routes/collection.route')
const authRouter = require('./routes/auth.router')
const cardsRouter = require('./routes/cards.router')

const PORT = process.env.PORT || 5000

app.use(express.json())
app.use(cors())

app.use('/auth', authRouter)
app.use('/api', collectionRouter)
app.use('/api', cardsRouter)

app.listen(PORT, () => console.log("SERVER IS WORKING ON PORT: ", PORT))