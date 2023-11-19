import { portResponseAPI } from './api/models';

/**
 * @percentile must be a number between [1, 100]
 */
export const calculatePercentile = (percentile: number, schs: portResponseAPI[]) => {
	// filter the array which departures hasn't happened yet
	// or the ones with the flag isOmitted to true
	// then return and array of time in minutes of the duration 
	// of each event
	const secAr = schs.filter(s => !!s.departure)
		.filter(s => !s.isOmitted)
		.map(sch => {
		const departure: number = (new Date(sch.departure)).getTime()
		const arrival: number = (new Date(sch.arrival)).getTime()
		return (departure - arrival) / 1000 / 60 // minutes
	})
	// calculate how many events happened in the corresponding percentile
	const itemsIncluded = Math.round(schs.length * percentile / 100)
	// if no events or 1 event and the percentile is lower than 50
	if (percentile === 0 || itemsIncluded < 1) {
		return  ['0.0', 'minutes']
	}
	// sort those events by duration and pic those in the corresponding 
	//  percentile and sums themm
	const sum = secAr.sort((a, b) => (a > b) ? 1 : -1)
		.slice(0, itemsIncluded)
		.reduce((previous, current) => current += previous);
	// calculate the average of the events by dividing the sum
	// by the number of items
	const avg = sum / itemsIncluded;
	if (avg < 60) {
		return [avg.toFixed(1), 'minutes']
	} else if (avg < 60 * 24) {
		return [(avg / 60).toFixed(1), 'hours']
	} else {
		return [(avg / 60 / 24).toFixed(1), 'days']
	}
}

export const displayArray = (ar: string[]) => {
	return ar.join(' ')
}