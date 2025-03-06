import { ValidateError } from '../errors/validateError';

export interface Validation<T> {
	validate(input: any): T | ValidateError;
}
