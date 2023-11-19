export type UpdatedFieldType = 'departure' | 'arrival' | 'isOmitted'

export type LogType = {
	updatedField: UpdatedFieldType,
	arrival: Date,
	departure: Date,
	isOmitted: boolean | null,
	createdDate: Date
}

export type PortType =  {
	id: string,
	name: string
}

export interface VesselResponseAPI {
	imo: number,
	name: string,
}

export interface portResponseAPI {
	arrival: Date,
	departure: Date,
	createdDate: Date,
	isOmitted: boolean,
	service: string,
	port: PortType,
	logEntries: LogType[],
}

export interface ScheduleResponseAPI {
  vessel: VesselResponseAPI,
  portCalls: portResponseAPI[]
}
