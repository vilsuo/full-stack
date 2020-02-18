const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url:"https://reactpatterns.com/",
    likes: 7,
    __v: 0
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    __v: 0
  }
]

const initialUser = {
  username: 'eka user',
  name: 'ekan nimi',
  password: 'ekan salasana'
}

beforeEach(async () => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  // välivaihe 4.17, jotta dbssä on eka useri
  const userObject = new User(initialUser)
  await userObject.save()

  // tallennetaan kaikki blogit järjestyksessä
  for (let blog of initialBlogs) {
    let blogObject = new Blog(blog)
    await api.post('/api/blogs')
      .send(blogObject)
  }
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body.length).toBe(initialBlogs.length)
})

test('GET /api/blogs field id is defined', async () => {
  const response = await api.get('/api/blogs')

  response.body.forEach(blog => {
    expect(blog.id).toBeDefined()
  })
})

test('If a blog has no likes field then that blog has default zero likes', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body[2].likes).toBe(0)
})

test('a blog with title and url can be added', async () => {

  await api
    .post('/api/blogs')
    .send(new Blog(initialBlogs[0]))
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const result = await api.get('/api/blogs')
  const titles = result.body.map(blog => blog.title)

  expect(titles).toContain(initialBlogs[0].title)

  expect(result.body.length).toBe(initialBlogs.length + 1)
})

test('a blog without title or url can\'t be added', async () => {
  const blog = {
    _id: "5a422b891b54a676234d17fa",
    author: "Robert C. Martin",
    likes: 10,
    __v: 0
  }

  await api
    .post('/api/blogs')
    .send(new Blog(blog))
    .expect(400)

  const response = await api.get('/api/blogs')
  expect(response.body.length).toBe(initialBlogs.length)
})

describe('', () => {
  test('posted blog has existing userId in user-field ', async () => {
    const response = await api.get('/api/blogs')
    const firstBlog = response.body[0]
    console.log('first blog', firstBlog)
  
    expect(firstBlog.user.id).toBeDefined()

    const user = await User.findById(firstBlog.user.id)
    expect(user).toBeDefined
  })
})

afterAll(() => {
  mongoose.connection.close()
})