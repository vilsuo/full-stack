const mongoose = require('mongoose')
const supertest = require('supertest')
const User = require('../models/user')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

beforeEach(async () => {
  await User.deleteMany({})
})

describe('when there is initially one user at db', () => {
  beforeEach(async () => {
    const user = new User({ username: 'root', password: 'sekret' })
    await user.save()
  })

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'username',
      name: 'name',
      password: 'password'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd.length).toBe(usersAtStart.length + 1)
    
    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('username must be unique', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'sgoefmk',
      password: 'secret'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd.length).toBe(usersAtStart.length)
  })
})

describe('username and password', () => {
  test('password must be defined', async () => {
    const usersAtStart = await helper.usersInDb()
  
    const newUserWithoutPassword = {
      username: 'username',
      name: 'name'
    }

    const result = await api
      .post('/api/users')
      .send(newUserWithoutPassword)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('password is undefined')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd.length).toBe(usersAtStart.length)
  })

  test('password minimum length is 3', async () => {
    const usersAtStart = await helper.usersInDb()
  
    const newUserWithShortPassword = {
      username: 'username',
      name: 'name',
      password: 'pa'
    }

    const result = await api
      .post('/api/users')
      .send(newUserWithShortPassword)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('password minimum length is 3')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd.length).toBe(usersAtStart.length)
  })

  test('username must be defined', async () => {
    const usersAtStart = await helper.usersInDb()
  
    const newUserWithoutUsername = {
      name: 'name',
      password: 'password'
    }

    const result = await api
      .post('/api/users')
      .send(newUserWithoutUsername)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('username must be defined')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd.length).toBe(usersAtStart.length)
  })

  test('username minimum length is 3', async () => {
    const usersAtStart = await helper.usersInDb()
  
    const newUserWithShortUsername = {
      username: 'us',
      name: 'name',
      password: 'password'
    }

    const result = await api
      .post('/api/users')
      .send(newUserWithShortUsername)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('username minimum length is 3')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd.length).toBe(usersAtStart.length)
  })
})

/*
afterAll(() => {
  mongoose.connection.close()
})
*/