import { useState } from 'react'

const DisplayTitle = ({title}) => <h1>{title}</h1>



const StatisticLine = (props) => <p>{props.text} {props.value}</p>

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
)

const Statistics = (props) => {
  const good = props.good
  const neutral = props.neutral
  const bad = props.bad

  const total = good + neutral + bad

  const averageValue = (good * 1 + bad * (-1)) / total
  const positivePercentage = good * 100 / total

  if (total === 0) {
    return <p>No feedback given</p>
  }

  return (
    <>
      <StatisticLine text="good" value={good} />
      <StatisticLine text="neutral" value={neutral} />
      <StatisticLine text="bad" value={bad} />

      <StatisticLine text="all" value={total} />
      <StatisticLine text="average" value={averageValue} />

      <StatisticLine text="positive" value={positivePercentage + "%"} />
    </>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <DisplayTitle title="give feedback"/>
      <Button onClick={() => setGood(good+1)} text="good"/>
      <Button onClick={() => setNeutral(neutral+1)} text="neutral"/>
      <Button onClick={() => setBad(bad+1)} text="bad"/>
      <DisplayTitle title="statistics"/>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}



export default App