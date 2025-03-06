export class InUseError extends Error {
	constructor(data: string) {
		super('Is already in use :' + data);
		this.name = 'InUseError';
	}
}
