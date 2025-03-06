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
		user_id: z.string(),
		name: z.string({ message: 'Informe seu nome' }).min(3).max(255),
		email: z.string({ message: 'Informe seu email' }).email(),
		phone: z.string().regex(/^\(\d{2}\)\d{5}-\d{4}$/g, {
			message: 'Telefone inválido (99)99999-9999',
		}),
		password: z.optional(passwordSchema),
		password_confirmation: z.optional(passwordSchema),
	})
	.refine((data) => {
		const errors: z.ZodIssue[] = [];
		if (!!data.password && !!data.password_confirmation && data.password !== data.password_confirmation) {
			errors.push({ code: z.ZodIssueCode.custom, message: 'As senhas não conferem!', path: ['password', 'password_confirmation'] });
		}

		if (errors.length > 0) {
			throw new z.ZodError(errors);
		}
		return true;
	})
	.transform((data) => ({
		...data,
		email: data.email.toLowerCase(),
	}));

export type IUpdateUserSchema = z.infer<typeof schema>;
const UpdateUserSchema = (data: any): IUpdateUserSchema => schema.parse(data);

export class UpdateUserValidation implements Validation<IUpdateUserSchema> {
	private static handleValidationError(error: z.ZodError): ValidateError {
		const errors = error.errors.map((err) => ({
			message: err.message,
			field: err.path.map(String),
		}));
		return new ValidateError(errors);
	}

	validate(input: any): IUpdateUserSchema | ValidateError {
		try {
			return UpdateUserSchema(input);
		} catch (error) {
			if (error instanceof z.ZodError) {
				return UpdateUserValidation.handleValidationError(error);
			}
			console.error(error);
			return new ValidateError([{ message: error, field: ['update-user'] }]);
		}
	}
}
