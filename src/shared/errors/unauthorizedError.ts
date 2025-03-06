export class UnauthorizedError extends Error {
	constructor(_error?: Error) {
		super('Não autorizado');
		this.name = 'Unauthorized Error';
	}
}
