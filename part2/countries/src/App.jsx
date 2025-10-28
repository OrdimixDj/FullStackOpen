import { useState, useEffect } from 'react'
import axios from 'axios'

const DisplayNames = ({name}) => { 
  return(
    <p>{name}</p>
  )
}

const DisplayCountry = ({country}) => { 
  // Found this information on internet: we can't read elements with map if it's not an array.
  // I could have use for loop, but I preferred that way to stay in the course subject
  const languageNames = Object.values(country.languages) 

  return(
    <div>
      <h1>{country.name.common}</h1>
      <p>Capital {country.capital} <br/>Area {country.area}</p>

      <h2>Languages</h2>
      <ul>
        {languageNames.map(language => <li key={language}>{language}</li>)}
      </ul>

      <img src={country.flags.png} alt={country.flags.alt} style={{width: '200px', height: 'auto'}} />
    </div>
  )
}

const Display = ({countryRequest, countries}) => {
  const filteredCountries = countries.filter(country => country.name.common.toLowerCase().includes(countryRequest.toLowerCase()))

  if (filteredCountries.length > 10) {
    return (
      <p>Too many matches, specify another filter</p>
    )
  }
  else if (filteredCountries.length > 1 && filteredCountries.length < 10) {
    return (
      filteredCountries.map(country => <DisplayNames key={country.name.official} name={country.name.common} />)
    )
  }
  else if (filteredCountries.length === 1) {
    return(
      <DisplayCountry country={filteredCountries[0]} />
    )
  }
}

const App = () => {
  const [countryRequest, setCountryRequest] = useState('')
  const [countries, setCountries] = useState([])

  useEffect(() => {
    console.log('fetching countries...')
    axios
      .get(`https://restcountries.com/v3.1/all?fields=name,capital,area,languages,flags`)
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleChange = (event) => {
    setCountryRequest(event.target.value)
  }

  return (
    <div>
      <form>find countries <input value={countryRequest} onChange={handleChange} /></form>
      <Display countryRequest={countryRequest} countries={countries} />
    </div>
  )
}

export default App