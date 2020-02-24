import React, { useState } from 'react'
import blogService from '../services/blogs'

const BlogForm = ({ blogs, setBlogs }) => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleBlogPost = async (event) => {
    event.preventDefault()

    const blogToPost = {
      title: title,
      author: author,
      url: url
    }

    try {
      const result = await blogService.create(blogToPost)
      setBlogs(blogs.concat(result))
      //showMessage(`a new blog ${result.title} by ${result.author} added`)

    } catch (error) {
      //showMessage(error.response.data.error)
    }
    resetBlogFormInputs()
  }

  const resetBlogFormInputs = () => {
    setTitle('')
    setAuthor('')
    setUrl('')
  }
  return (
    <div>
      <form onSubmit={handleBlogPost}>
        <div>
          title
          <input
            type="text"
            value={title}
            name="Title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            type="text"
            value={author}
            name="Author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url
          <input
            type="text"
            value={url}
            name="Url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default BlogForm