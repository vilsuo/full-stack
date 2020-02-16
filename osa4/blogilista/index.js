const http = require('http')
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const blogsRouter = require('./controllers/blogs')


const password = process.argv[2]

const mongoUrl = `mongodb+srv://fullstack:${password}@cluster0-20mf4.mongodb.net/blogs?retryWrites=true&w=majority`

mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true})
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDb:', error.message)
  })

app.use(cors())
app.use(express.json())
app.use('/api/blogs', blogsRouter)

const PORT = 3003
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})