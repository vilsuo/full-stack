import React, { useState } from 'react'
import PropTypes from 'prop-types'
import blogService from '../services/blogs'

const Blog = ({ blog, blogs, setBlogs }) => {
  const [showAll, setShowAll] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  Blog.propTypes = {
    blog: PropTypes.object.isRequired,
    blogs: PropTypes.array.isRequired,
    setBlogs: PropTypes.func.isRequired
  }

  const likeHandler = async () => {
    const updatedBlogPopulated = { ...blog, likes: blog.likes + 1 }
    const updatedBlogUnpopulated = { ...updatedBlogPopulated, user: blog.user.id }
    await blogService.update(blog.id, updatedBlogUnpopulated)
    setBlogs(blogs.filter(blog => blog.id !== updatedBlogPopulated.id).concat(updatedBlogPopulated))
  }

  const showShort = () => (
    <div style={blogStyle}>
      {blog.title} {blog.author}
      <button onClick={() => setShowAll(true)}>view</button>
    </div>
  )

  const showLong = () => (
    <div>
      {blog.title} {blog.author}
      <button onClick={() => setShowAll(false)}>hide</button>
      <p>{blog.url}</p>
      <p>
        likes {blog.likes}
        <button onClick={likeHandler}>like</button>
      </p>
      <p>{blog.user.name}</p>
    </div>
  )

  return (
    <div style={blogStyle}>
      {!showAll && showShort()}
      {showAll && showLong()}
    </div>
  )
}

export default Blog
