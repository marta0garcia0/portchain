import { useEffect, useState } from 'react'
import { getSchedule, getVessels } from './api/api'
import { VesselResponseAPI, ScheduleType } from './api/models'
import { calculatePercentile } from './utils';

import './App.scss'

function App() {

  const [ports, setPorts] = useState<VesselResponseAPI[]>([])
  const [schedules, setSchedules] = useState<ScheduleType[]>([])

  useEffect(() => {
    getVessels().then((data: VesselResponseAPI[]) => setPorts(data))
  }, [])

  useEffect(() => {
    const portPromises: Promise<ScheduleType>[] = []
    ports.map((port) => {
      portPromises.push(getSchedule(port.imo))
    })
    Promise.all(portPromises).then((portSchedules) => {
      const sche = portSchedules
        .sort((a, b) => (a.portCalls.length > b.portCalls.length) ? -1 : 1)
      setSchedules(sche)
    })
  }, [ports])

  return (
    <>
      <div className='App'>
        <div className='column'>
            <div className='Card'>
              <h2>Top 5 more port calls</h2>
              {schedules.slice(0, 5).map(sc => (
                <div key={sc.vessel.imo}>
                  <p>Id: <span>{sc.vessel.imo}</span></p>
                  <p>Name: <span>{sc.vessel.name}</span></p>
                  <p>Port calls: <span>{sc.portCalls.length}</span></p>
                </div>
              ))}
            </div>
            <div className='Card'>
              <h2>Top 5 less port calls</h2>
              {schedules.slice(schedules.length - 5, schedules.length)
                .sort((a, b) => (a.portCalls.length > b.portCalls.length) ? 1 : -1)
                .map(sc => (
                <div key={sc.vessel.imo}>
                  <p>Id: <span>{sc.vessel.imo}</span></p>
                  <p>Name: <span>{sc.vessel.name}</span></p>
                  <p>Port calls: <span>{sc.portCalls.length}</span></p>
                </div>
              ))}
            </div>
          </div>
          <div className='column'>
            <div className='Card'>
              <h2>Port percentiles of call durations</h2>
              {schedules.map(sc => (
                <div key={sc.vessel.imo}>
                  <p>Id: <span>{sc.vessel.imo}</span></p>
                  <p>Name: <span>{sc.vessel.name}</span></p>
                  <p>Duration:</p>
                  <p>percentil 5: <span>{calculatePercentile(5, sc.portCalls)}</span></p>
                  <p>percentil 20: <span>{calculatePercentile(20, sc.portCalls)}</span></p>
                  <p>percentil 50: <span>{calculatePercentile(50, sc.portCalls)}</span></p>
                  <p>percentil 75: <span>{calculatePercentile(75, sc.portCalls)}</span></p>
                  <p>percentil 90: <span>{calculatePercentile(90, sc.portCalls)}</span></p>
                  
                </div>
              ))}
            </div>
          </div>
      </div>
    </>
  )
}

export default App
