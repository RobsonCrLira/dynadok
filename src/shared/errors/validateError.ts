export type ValidationResponse = {
	message: any;
	field: string[];
}[];

export class ValidateError extends Error {
	constructor(error: ValidationResponse) {
		const errors = error.reduce((acc, err) => {
			const { message, field } = err;
			acc.push({ message, field });
			return acc;
		}, []);
		super(JSON.stringify(errors));
		this.name = 'ValidateError';
	}
}
