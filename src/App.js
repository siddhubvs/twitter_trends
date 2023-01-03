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
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(position=>{
           axios.get('/api/near-me',{
            params:{
              lat: position.coords.latitude,
              long: position.coords.longitude,
            },
           }).then(response=>{
            console.log(response.data[0])
            setWoeid(response.data[0].woeid)

          })
           .catch(error=>console.log(error.message))
      },(error)=>{
        console.log(error.message)
      })
    }
    else{
    alert('Location is still in development')
    }  
  }

  function listTrends() {
    return (
      
    
      <ul>
        {trends.map((trend, index) => {
          return (
            <li key={index}>
              <a href={trend.url}>{index + 1}.  {trend.name}</a>
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
        <h3>Most Trending Hashtags</h3>
      </header>
      <div className='menu'>
        <select name='trending-place' onChange={e=>setWoeid(e.target.value)}>
          <option value='1'>Worldwide</option>
          <option value='23424848'>India</option>
          <option value='2428344'>Florida</option>
          <option value='468739'>Buenos Aires</option>
          <option value='615702'>Paris</option>
          <option value='1105779'>Sydney</option>
          <option value='638242'>Berlin</option>
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
 