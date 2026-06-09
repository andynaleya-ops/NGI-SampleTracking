export type StatusType =
	| 'sample_received'
	| 'resampling'
	| 'in_processing'
	| 'rejected'
	| 'report_released'

export type SampleType = {
	barcode: string
	name: string
	birthday: string
	status: StatusType
	product: string
}
