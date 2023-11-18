import axios from 'axios'
import { ScheduleResponseAPI, VesselResponseAPI } from './models'

const	baseURL = 'https://import-coding-challenge-api.portchain.com/api/v2/'


export const getVessels = async (): Promise<VesselResponseAPI[]> => {
	const { data } = await axios.get<VesselResponseAPI[]>(baseURL + 'vessels')
	return data
}

export const getSchedule = async (id: string): Promise<ScheduleResponseAPI> => {
	const { data } = await axios.get<ScheduleResponseAPI>(baseURL + 'schedule/' + id)
	return data
}
