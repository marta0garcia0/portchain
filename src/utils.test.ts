
import { portResponseAPI } from './api/models'
import { calculatePercentile } from './utils'

const setSchs = (arrival: Date, length: number): portResponseAPI[] => {
	return Array(length).fill({
		arrival,
		departure: new Date(),
		createdDate: new Date(),
		isOmitted: false,
		service: "Far East Loop 2",
		port: {
				id: "CNTNG",
				name: "Tianjin Pt"
		},
		logEntries: [],
	})
}

describe('should calculate the percentile of an array of data in form of portResponseAPI model', () => {
	it('1 event the duration time is 0 (arrival equal departure) case', () => {
		const result = calculatePercentile(100, setSchs(new Date(), 1))
		expect(result).toBeTruthy()
		expect(result).toHaveLength(2)
		expect(result[0]).toEqual('0.0')
		expect(result[1]).toEqual('minutes')
		const result2 = calculatePercentile(5, setSchs(new Date(), 1))
		expect(result2[0]).toEqual('0.0')
		expect(result2[1]).toEqual('minutes')
	})
	it('1 event the duration time is less than half minute (25s) case', 	() => {
		// 25/60 = 0.416666 minutes
		const result = calculatePercentile(100,
			setSchs(new Date(new Date().getTime() - 25*1000), 1))
		// 25/60 = 0.416666 minutes
		expect(result[0]).toEqual('0.4')
		expect(result[1]).toEqual('minutes')
		const result2 = calculatePercentile(5,
			setSchs(new Date(new Date().getTime() - 25*1000), 1))
		// for a percentile of 5 we have 0 as a result
		expect(result2[0]).toEqual('0.0')
		expect(result2[1]).toEqual('minutes')
		const result3 = calculatePercentile(50,
			setSchs(new Date(new Date().getTime() - 25*1000), 1))
		// for a percentile of 50 we have the same value as 100
		expect(result3[0]).toEqual('0.4')
		expect(result3[1]).toEqual('minutes')
		const result4 = calculatePercentile(49,
			setSchs(new Date(new Date().getTime() - 25*1000), 1))
		// for a percentile of 49 we have the same value as 0
		expect(result4[0]).toEqual('0.0')
		expect(result4[1]).toEqual('minutes')
	})
	it('5 events the duration time is less than half minute (25s) case', 	() => {
		// 25/60 = 0.416666 minutes
		const result = calculatePercentile(100,
			setSchs(new Date(new Date().getTime() - 25*1000), 5))
		// 25/60 = 0.416666 minutes
		expect(result[0]).toEqual('0.4')
		expect(result[1]).toEqual('minutes')
		const result2 = calculatePercentile(9,
			setSchs(new Date(new Date().getTime() - 25*1000), 5))
		// for a percentile of 9 we have 0 as a result (5 events + round)
		expect(result2[0]).toEqual('0.0')
		expect(result2[1]).toEqual('minutes')
		const result3 = calculatePercentile(50,
			setSchs(new Date(new Date().getTime() - 25*1000), 5))
		// for a percentile of 50 we have the same value as 100
		expect(result3[0]).toEqual('0.4')
		expect(result3[1]).toEqual('minutes')
		const result4 = calculatePercentile(10,
			setSchs(new Date(new Date().getTime() - 25*1000), 5))
		// for a percentile of 10 we have the same value as 100 (5 events + round)
		// one event is counted
		expect(result4[0]).toEqual('0.4')
		expect(result4[1]).toEqual('minutes')
	})
})
