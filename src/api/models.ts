export type UpdatedFieldType = 'departure' | 'arrival' | 'isOmitted'

export type LogType = {
	updatedField: UpdatedFieldType,
	arrival: null,
	departure: Date,
	isOmitted: boolean | null,
	createdDate: Date
}

export interface VesselResponseAPI {
	imo: number;
	name: string;
}

export interface portResponseAPI {
	arrival: Date,
	departure: Date,
	createdDate: Date,
	isOmitted: true,
	service: string,
	port: VesselResponseAPI,
	logEntries: LogType[],
}

export interface ScheduleResponseAPI {
  vessel: VesselResponseAPI,
  portCalls: portResponseAPI[]
}
