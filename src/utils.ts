import { portResponseAPI } from './api/models';

export const calculatePercentile = (percentile: number, schs: portResponseAPI[]) => {
	const secAr = schs.map(sch => {
		const departure: number = (new Date(sch.departure)).getTime()
		const arrival: number = (new Date(sch.arrival)).getTime()
		return (departure - arrival) / 1000 / 60 // minutes
	})
	const itemsIncluded = schs.length * percentile / 100
	const sum = secAr.sort((a, b) => (a > b) ? 1 : -1)
		.slice(0, Math.round(itemsIncluded))
		.reduce((previous, current) => current += previous);
	const avg = sum / Math.round(itemsIncluded);
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