import { useEffect, useState } from 'react'
import { getSchedule, getVessels } from './api/api'
import { VesselResponseAPI, ScheduleResponseAPI } from './api/models'
import { calculatePercentile, displayArray } from './utils'
import { Card } from './components/card/Card'

import './App.scss'

function App() {
  const percents2display = [5, 20, 50, 75, 90]
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
    <div className='App'>
      <div className='column'>
        <Card title={'Top 5 more port calls'} >
          <div>
          {schedules.slice(0, (schedules.length >= 5 ? 5 : schedules.length))
            .map(sc => (
            <div className='Card-block' key={sc.vessel.imo}>
              <p><span className='name'>{sc.vessel.name}</span>{' (' + sc.vessel.imo + ')'}</p>
              <p className='info'>Total port calls: <span>{sc.portCalls.length}</span></p>
            </div>
          ))}
          </div>
        </Card>
        <Card title={'Top 5 less port calls'} >
          <div>
          {schedules
            .slice(schedules.length - (schedules.length >= 5 ? 5 : 0), schedules.length)
            .sort((a, b) => (a.portCalls.length > b.portCalls.length) ? 1 : -1)
            .map(sc => (
              <div className='Card-block' key={sc.vessel.imo}>
                <p><span className='name'>{sc.vessel.name}</span>{' (' + sc.vessel.imo + ')'}</p>
                <p className='info'>Total port calls: <span>{sc.portCalls.length}</span></p>
              </div>
          ))}
          </div>
        </Card>
      </div>
      <div className='column'>
        <Card title={'Port call durations percentiles'} >
          <div>
            {schedules.map(sc => (
              <div className='Card-block' key={sc.vessel.imo}>
                <p><span className='name'>{sc.vessel.name}</span>{' (' + sc.vessel.imo + ')'}</p>
                <div className='info'>
                  <p>Time duration percentiles:</p>
                  <div>{percents2display.map(percent => 
                    <p>{percent}%: <span>{displayArray(calculatePercentile(percent, sc.portCalls))}</span></p>
                  )}</div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}

export default App
