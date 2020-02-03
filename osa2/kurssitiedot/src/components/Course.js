import React from 'react'

const Course = ({course}) => {
  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

const Header = ({name}) => (
  <div>
    <h1>{name}</h1>
  </div>
)

const Content = ({parts}) => {return (
    <div>
      {parts.map(part => <Part key={part.id} part={part} />)}
    </div>
  )
}

const Part = ({part}) => {
  return (
    <div>
        <p>{part.name} {part.exercises}</p>
    </div>
  )
}

const Total = ({parts}) => {
  const exercises = parts.map(part => part.exercises)
                          .reduce((acc, cur) => acc + cur)
  return (
    <div>
      <p>total of {exercises} exercises</p>
    </div>
  )
}

export default Course