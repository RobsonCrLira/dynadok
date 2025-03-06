export class AccessDeniedError extends Error {
	constructor() {
		super('Accesso Negado');
		this.name = 'Access Denied Error';
	}
}
