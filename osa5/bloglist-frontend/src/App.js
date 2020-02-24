import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [message, setMessage] = useState('')

  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      window.localStorage.setItem(
        'loggedBlogappUserToken', JSON.stringify(user.token)
      )

      blogService.setToken(user.token)

      setUser(user)
      setUsername('')
      setPassword('')
    } catch (error) {
      showMessage(error.response.data.error)
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser')
    window.localStorage.removeItem('loggedBlogappUserToken')
    setUser(null)
    blogService.setToken(null)
  }

  const showMessage = message => {
    setMessage(message)

    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        {message}
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              type="text"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <p>{message}</p>
      <div>
        {user.username} logged in
        <button onClick={handleLogout}>logout</button>
      </div>
      <div>
        <Togglable showLabel='create new blog' hideLabel='cancel'>
          <BlogForm
            blogs={blogs}
            setBlogs={setBlogs}
          />
        </Togglable>
      </div>
      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map(blog =>
          <Blog
            key={blog.id}
            blog={blog}
            blogs={blogs}
            setBlogs={setBlogs}
          />
        )
      }
    </div>
  )
}

export default App