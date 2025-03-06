import { z } from 'zod';
import { ValidateError } from '../../shared/errors/validateError';
import { Validation } from '../../shared/interfaces/validation';

const passwordSchema = z
	.string()
	.regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&#]{8,}/g, {
		message: 'Senha deve conter ao menos 1 letra maiúscula, 1 letra minúscula e 1 número!',
	})
	.min(8, { message: 'Senha deve conter ao menos 8 caracteres!' })
	.max(20);

const schema = z
	.object({
		name: z.string({ message: 'Informe seu nome' }).min(3).max(255),
		email: z.string({ message: 'Informe seu email' }).email(),
		phone: z.string().regex(/^\(\d{2}\)\d{5}-\d{4}$/g, {
			message: 'Telefone inválido (99)99999-9999',
		}),
		password: passwordSchema,
		password_confirmation: passwordSchema,
	})
	.refine((data) => data.password === data.password_confirmation, {
		message: 'As senhas não conferem',
	})
	.transform((data) => ({
		...data,
		email: data.email.toLowerCase(),
	}));

export type ICreateUserSchema = z.infer<typeof schema>;
const CreateUserSchema = (data: any): ICreateUserSchema => schema.parse(data);

export class CreateUserValidation implements Validation<ICreateUserSchema> {
	private static handleValidationError(error: z.ZodError): ValidateError {
		const errors = error.errors.map((err) => ({
			message: err.message,
			field: err.path.map(String),
		}));
		return new ValidateError(errors);
	}

	validate(input: any): ICreateUserSchema | ValidateError {
		try {
			return CreateUserSchema(input);
		} catch (error) {
			if (error instanceof z.ZodError) {
				return CreateUserValidation.handleValidationError(error);
			}
			console.error(error);
			return new ValidateError([{ message: error, field: ['CreateUser'] }]);
		}
	}
}
