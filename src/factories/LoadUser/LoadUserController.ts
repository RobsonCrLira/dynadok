import { LoadUserUseCase } from '../../data/usecase/User/LoadUserUseCase';
import { badRequest, ok, serverError } from '../../shared/http/httpHelpers';
import { Controller } from '../../shared/interfaces/controller';
import { HttpRequest, HttpResponse } from '../../shared/interfaces/http';

export class LoadUserController implements Controller {
	constructor(private readonly loadUser: LoadUserUseCase) {}
	async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
		try {
			const { user_id } = httpRequest.params;
			const data = await this.loadUser.loadById(user_id);

			if (data instanceof Error) {
				return badRequest(data);
			}
			return ok(data);
		} catch (error) {
			console.error(error);
			return serverError(error);
		}
	}
}
