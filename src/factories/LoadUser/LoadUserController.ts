import { LoadUserUseCase } from '../../data/usecase/User/LoadUserUseCase';
import { badRequest, ok, serverError } from '../../shared/http/httpHelpers';
import { Controller } from '../../shared/interfaces/controller';
import { HttpRequest, HttpResponse } from '../../shared/interfaces/http';

export class LoadUserController implements Controller {
	constructor(private readonly loadUser: LoadUserUseCase) {}
	async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
		try {
			const { user_id } = httpRequest.params;
			const response = await this.loadUser.loadById(user_id);

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
