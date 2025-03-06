import { badRequest, badRequestCustom, ok, serverError } from '../../shared/http/httpHelpers';
import { Controller } from '../../shared/interfaces/controller';
import { HttpRequest, HttpResponse } from '../../shared/interfaces/http';
import { IUserUseCase } from '../../shared/interfaces/userUseCase';
import { Validation } from '../../shared/interfaces/validation';
import { IUpdateUserSchema } from './UpdateUserValidation';

export class UpdateUserController implements Controller {
	constructor(
		private readonly addUserUseCase: IUserUseCase,
		private readonly validate: Validation<IUpdateUserSchema>,
	) {}
	async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
		try {
			const { user_id } = httpRequest.params;

			const validate = this.validate.validate({ ...httpRequest.body, user_id });
			if (validate instanceof Error) {
				return badRequestCustom(validate);
			}
			const response = await this.addUserUseCase.execute(validate);

			if (response instanceof Error) {
				return badRequest(response);
			}
			return ok({ message: 'Usuário atualizado com sucesso!' });
		} catch (error) {
			console.error(error);
			return serverError(error);
		}
	}
}
