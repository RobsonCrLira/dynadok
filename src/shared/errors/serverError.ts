export class ServerError extends Error {
	constructor(error: string) {
		super(`Erro no servidor - ${error}`);
		this.name = 'Server Error';
		this.stack = error;
	}
}
