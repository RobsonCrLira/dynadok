import { badRequest, ok, serverError } from '../../shared/http/httpHelpers';
import { Controller } from '../../shared/interfaces/controller';
import { HttpRequest, HttpResponse } from '../../shared/interfaces/http';
import { IUserUseCase } from '../../shared/interfaces/userUseCase';

export class LoadUserController implements Controller {
	constructor(private readonly loadUser: IUserUseCase) {}
	async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
		try {
			const { user_id } = httpRequest.params;
			const data = await this.loadUser.execute(user_id);

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
