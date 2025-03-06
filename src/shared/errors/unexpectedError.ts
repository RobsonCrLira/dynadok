export class UnexpectedError extends Error {
	constructor(paramName: string) {
		super(`Erro Inesperado: ${paramName}`);
		this.name = 'UnexpectedError';
	}
}
