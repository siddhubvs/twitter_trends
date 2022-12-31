import logo from './twitter.svg'
import './App.css'
import { useState, useEffect } from 'react'
import axios from 'axios'
import {FaCrosshairs} from 'react-icons/fa'
function App() {
  const [trends, setTrends] = useState([])
  const [woeid, setWoeid] = useState('1')

  useEffect(() => getTrends(), [woeid])

const rootUrl = process.env.NODE_ENV === "production" ? "https://twitter-backend-c44k.onrender.com" : ""

  function getTrends() {
    axios
      .get(`${rootUrl}/api/trends`, {
        
        params: {
          woeid,
        },
      })
      .then(response => {
        setTrends(response.data[0].trends)
      })
      .catch(error => console.log(error.message))
  }
  
  function handleLocation(){
    alert('handle location')
  }
  function listTrends() {
    return (
      <ul>
        {trends.map((trend, index) => {
          return (
            <li key={index}>
              <a href={trend.url}>{trend.name}</a>
              </li>
          )
        })}
      </ul>
    )
  }  
  
  return (
    <div className='App'>
      <header className='App-header'>
        <img src={logo} className='logo' alt='twitter' />
        <h3>Twitter Trends</h3>
      </header>
      <div className='menu'>
        <select name='trending-place' onChange={e=>setWoeid(e.target.value)}>
          <option value='1'>Worldwide</option>
          <option value='23424848'>India</option>
          <option value='2459115'>New York,US</option>
          <option value='44418'>London,UK</option>
          <option value='615702'>Paris</option>
          <option value='1105779'>Sydney,AU</option>
        </select>
        <div className="location" onClick={handleLocation}>
        <FaCrosshairs/>
        </div>
        </div>
        <div className='content'>{listTrends()}</div>
        </div>
  )
}

export default App
 