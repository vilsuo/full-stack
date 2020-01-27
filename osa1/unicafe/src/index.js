import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => () => {
    setGood(good + 1)
  }

  const handleNeutralClick = () => () => {
    setNeutral(neutral + 1)
  }

  const handleBadClick = () => () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={handleGoodClick()} text='good'/>
      <Button handleClick={handleNeutralClick()} text='neutral' />
      <Button handleClick={handleBadClick()} text='bad' />
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Statistics = ({good, neutral, bad}) => {
  let n = good + neutral + bad
  
  const average = () => (good - bad)/(good + bad + neutral)
  const positive = () => good * 100 / n + "%"

  if (n === 0) {
    return (
      <div>
        <p>No feedback given</p>
      </div>
    )
  } else {
    return (
      <table>
        <tbody>
          <StatisticsLine text='good' value={good} />
          <StatisticsLine text='neutral' value={neutral} />
          <StatisticsLine text='bad' value={bad} />
          <StatisticsLine text='average' value={average()} />
          <StatisticsLine text='positive' value={positive()} />
        </tbody>
      </table>
    )
  }
}

const StatisticsLine = ({text, value}) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
)

ReactDOM.render(<App />, 
  document.getElementById('root')
)
