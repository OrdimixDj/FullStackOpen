import { useState } from 'react'

const DisplayTitle = ({title}) => <h1>{title}</h1>
const DisplayValue = ({text, value}) => <p>{text} {value}</p>

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
)

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
      <DisplayValue text="good" value={good} />
      <DisplayValue text="neutral" value={neutral} />
      <DisplayValue text="bad" value={bad} />
    </div>
  )
}

export default App