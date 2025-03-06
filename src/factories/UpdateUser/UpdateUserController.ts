import { AddUserUseCase } from '../../data/usecase/User/AddUserUseCase';
import { badRequest, badRequestCustom, ok, serverError } from '../../shared/http/httpHelpers';
import { Controller } from '../../shared/interfaces/controller';
import { HttpRequest, HttpResponse } from '../../shared/interfaces/http';
import { Validation } from '../../shared/interfaces/validation';
import { IUpdateUserSchema } from './UpdateUserValidation';

export class UpdateUserController implements Controller {
	constructor(
		private readonly addUserUseCase: AddUserUseCase,
		private readonly validate: Validation<IUpdateUserSchema>,
	) {}
	async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
		try {
			const { user_id } = httpRequest.params;

			const validate = this.validate.validate({ ...httpRequest.body, user_id });
			if (validate instanceof Error) {
				return badRequestCustom(validate);
			}
			const response = await this.addUserUseCase.add(validate);

			if (response instanceof Error) {
				return badRequest(response);
			}
			return ok({ message: 'Usuário Criado com sucesso!' });
		} catch (error) {
			console.error(error);
			return serverError(error);
		}
	}
}
