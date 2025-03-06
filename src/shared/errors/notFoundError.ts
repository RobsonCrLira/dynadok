export class NotFoundError extends Error {
	constructor(paramName: string) {
		super(`Não encontrado: ${paramName}`);
		this.name = 'NotFoundError';
	}
}
