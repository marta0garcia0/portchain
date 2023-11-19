import '@testing-library/jest-dom'
import { waitFor } from '@testing-library/react'
import App from './App'
import axios from 'axios'

beforeEach(() => {
	jest.spyOn(axios, 'get')
})

describe('App', () => {
  it('should display app component', async () => {
		const app = await waitFor(() => <App />)
		expect(app).toBeTruthy()
	})
})