import { useEffect, useState } from 'react'
import './App.scss'
import { getVessels } from './api/api'
import { VesselResponseAPI } from './api/models'

function App() {

  const [ports, setPorts] = useState<VesselResponseAPI[]>([])

  useEffect(() => {
    getVessels().then(data => setPorts(data))
  }, [])

  return (
    <>
      <div>
        portchain
        <div className='App'>
        <h1>Get Post 👇</h1><br />
          <h2>ports list</h2>
          <div className='grid'>
            {
              ports.map(post => (
                <div key={post.imo}>
                  <p>Title: <span>{post.imo}</span></p>
                  <p>Body: <span>{post.name}</span></p>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default App
