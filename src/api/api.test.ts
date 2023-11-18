import axios from 'axios'
import { waitFor } from '@testing-library/react'
import { getVessels, getSchedule } from './api'
import { ScheduleResponseAPI, VesselResponseAPI } from './models'

jest.mock('axios')

const vessels = [
  {
    imo: 1,
    name: 'Port A'
  },
  {
    imo: 2,
    name: 'Port B'
  }
]

const schedules = [{
  vessel: vessels[0],
  portCalls: [{
    arrival: '2018-12-30T08:00:00+00:00',
    departure: '2018-12-31T03:00:00+00:00',
    createdDate: '2018-11-15T14:58:44.813629+00:00',
    isOmitted: true,
    service: 'East Coast Loop 4',
    port: {
      imo: 1,
      name: 'Port A'
    },
    logEntries: [
      {
        updatedField: 'departure',
        arrival: null,
        departure: '2018-12-31T03:00:00+00:00',
        isOmitted: null,
        createdDate: '2018-11-15T14:58:44.813629+00:00'
      }
    ]
  }]
}]

const mockedAxios = axios as jest.Mocked<typeof axios>

describe('#getVessels() using Promises', () => {
  it('should return an array of vessels', async () => {
    // Provide the data object to be returned
    mockedAxios.get.mockResolvedValue({
      data: vessels
    })

    await waitFor(() => {
      getVessels().then((vesselsList: VesselResponseAPI[]) => {
        expect(vesselsList).toHaveLength(2)
        expect(vesselsList[0]).toHaveProperty('imo')
        expect(vesselsList[0].imo).toBe(1)
        expect(vesselsList[1]).toHaveProperty('name')
        expect(vesselsList[1].name).toBe('Port B')
      })
    })
  })
})


describe('#getSchedule() using Promises', () => {
  it('should return a port schedule data', async () => {
    // Provide the data object to be returned
    mockedAxios.get.mockResolvedValue({
      data: schedules[0]
    })

    await waitFor(() => {
      getSchedule(1).then((schedule: ScheduleResponseAPI) => {
        expect(schedule).toBeTruthy()
        expect(schedule).toHaveProperty('vessel')
        expect(schedule).toHaveProperty('portCalls')
      })
    })
  })
})
