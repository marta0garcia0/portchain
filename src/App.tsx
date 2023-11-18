import { useEffect, useState } from 'react'
import { getSchedule, getVessels } from './api/api'
import { VesselResponseAPI, ScheduleResponseAPI } from './api/models'
import { calculatePercentile } from './utils';
import { Card } from './components/card/Card';

import './App.scss'

function App() {

  const [ports, setPorts] = useState<VesselResponseAPI[]>([])
  const [schedules, setSchedules] = useState<ScheduleResponseAPI[]>([])

  useEffect(() => {
    getVessels().then((data: VesselResponseAPI[]) => setPorts(data))
  }, [])

  useEffect(() => {
    if (ports && ports.length > 0) {
      const portPromises: Promise<ScheduleResponseAPI>[] = []
      ports.map((port) => {
        portPromises.push(getSchedule(port.imo))
      })
      Promise.all(portPromises).then((portSchedules) => {
        if (portSchedules && portSchedules.length > 0) {
          const sche = portSchedules.sort((a, b) => (a.portCalls.length > b.portCalls.length) ? -1 : 1)
          setSchedules(sche)
        }
      })
    }
  }, [ports])

  return (
    <>
      <div className='App'>
        <div className='column'>
          <Card title={'Top 5 more port calls'} >
            <div>
            {schedules.slice(0, 5).map(sc => (
              <div className='Card-block' key={sc.vessel.imo}>
                <p>Id: <span>{sc.vessel.imo}</span></p>
                <p>Name: <span>{sc.vessel.name}</span></p>
                <p>Port calls: <span>{sc.portCalls.length}</span></p>
              </div>
            ))}
            </div>
          </Card>
          <Card title={'Top 5 less port calls'} >
            <div>
            {schedules.slice(schedules.length - 5, schedules.length)
              .sort((a, b) => (a.portCalls.length > b.portCalls.length) ? 1 : -1)
              .map(sc => (
              <div className='Card-block' key={sc.vessel.imo}>
                <p>Id: <span>{sc.vessel.imo}</span></p>
                <p>Name: <span>{sc.vessel.name}</span></p>
                <p>Port calls: <span>{sc.portCalls.length}</span></p>
              </div>
            ))}
            </div>
          </Card>
        </div>
        <div className='column'>
          <Card title={'Port percentiles of call durations'} >
            <div>
              {schedules.map(sc => (
                <div className='Card-block' key={sc.vessel.imo}>
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
          </Card>
        </div>
      </div>
    </>
  )
}

export default App
