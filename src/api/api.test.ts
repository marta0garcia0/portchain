import axios from 'axios'
import { waitFor } from '@testing-library/react'
import { getVessels } from './api'
import { VesselResponseAPI } from './models'

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
