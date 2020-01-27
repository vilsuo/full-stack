import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVote] = useState(
    { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
  )

  const selectRandomNumber = () => {
    setSelected(Math.floor(Math.random() * props.anecdotes.length))
  }

  const vote = () => {
    const copy = { ...votes }
    copy[selected] += 1
    setVote(copy)
  }

  const indexOfTheHighestVotedAnecdote = () => {
    let highestIdx = 0
    for (let i = 0; i < 6; i++) {
      if (votes[i] > votes[highestIdx]) {
        highestIdx = i
      }
    }
    return highestIdx
  }

  console.log(votes)

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{props.anecdotes[selected]}</p>
      <Button handleClick={vote} text='vote' />
      <Button handleClick={selectRandomNumber} text='next anecdote' />
      <h1>Anecdote with the most votes</h1>
      <p>{anecdotes[indexOfTheHighestVotedAnecdote()]}</p>
    </div>
  )
}

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)