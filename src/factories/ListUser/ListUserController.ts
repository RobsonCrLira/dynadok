import { ListUserUseCase } from '../../data/usecase/User/ListUserUseCase';
import { badRequest, ok, serverError } from '../../shared/http/httpHelpers';
import { Controller } from '../../shared/interfaces/controller';
import { HttpRequest, HttpResponse } from '../../shared/interfaces/http';

export class ListUserController implements Controller {
	constructor(private readonly listUser: ListUserUseCase) {}
	async handle(_httpRequest: HttpRequest): Promise<HttpResponse> {
		try {
			const response = await this.listUser.listAll();

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
