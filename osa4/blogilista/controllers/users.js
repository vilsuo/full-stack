const bcrypt = require('bcrypt')
const userRouter = require('express').Router()
const User = require('../models/user.js')

userRouter.post('/', async (request, response) => {
  const body = request.body

  // salasanan testaus
  if (body.password === undefined) {
    return response.status(400).json({ error: 'password is undefined' })

  } else if (body.password.length < 3) {
    return response.status(400).json({ error: 'password minimum length is 3' })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  })

  try {
    const savedUser = await user.save()
    response.status(200).json(savedUser.toJSON())

  } catch(exception) {
    // esim. mongoosen validation error
    response.status(400).json({ error: exception.message })
  }
})

module.exports = userRouter