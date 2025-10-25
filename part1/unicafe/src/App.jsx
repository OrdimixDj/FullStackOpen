import { useState } from 'react'

const DisplayTitle = ({title}) => <h1>{title}</h1>
const DisplayValue = ({text, value}) => <p>{text} {value}</p>

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
)

const Statistics = ({good,neutral,bad}) => {
  const total = good + neutral + bad

  const Average = ({good, neutral, bad, total}) => (good * 1 + bad * (-1)) / total
  const Positive = ({good, neutral, bad, total}) => good * 100 / total


  if (total === 0) {
    return <p>No feedback given</p>
  }

  return (
    <>
      <DisplayTitle title="statistics"/>
      <DisplayValue text="good" value={good} />
      <DisplayValue text="neutral" value={neutral} />
      <DisplayValue text="bad" value={bad} />
      <DisplayValue text="all" value={good + neutral + bad} />
      <DisplayValue text="average" value={Average({good,neutral,bad, total})} />
      <DisplayValue text="positive" value={Positive({good,neutral,bad, total}) + "%"} />
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
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}



export default App