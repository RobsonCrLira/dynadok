export class EmailInUseError extends Error {
	constructor(email: string) {
		super('Email is already in use :' + email);
		this.name = 'EmailInUseError';
	}
}
