
const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (sum, blog) => {
    return sum + blog.likes
  }
  return blogs.lenght === 0
    ? 0
    : blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  const reducer = ((eka, toka) => {
    if (toka.likes > eka.likes) {
      return toka
    } else {
      return eka
    }
  })

  const unwrap = ({ title, author, likes}) => ({title, author, likes})
  return blogs.length === 0
    ? 'no blogs in blog list'
    : unwrap(blogs.reduce(reducer))
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}