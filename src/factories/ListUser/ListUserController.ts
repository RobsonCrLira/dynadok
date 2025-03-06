import { ListUserUseCase } from "../../data/usecase/User/ListUserUseCase";
import { badRequest, ok, serverError } from "../../shared/http/httpHelpers";
import { Controller } from "../../shared/interfaces/controller";
import { HttpRequest, HttpResponse } from "../../shared/interfaces/http";

export class ListUserController implements Controller {
	constructor(private readonly listUser: ListUserUseCase) {}
	async handle(_httpRequest: HttpRequest): Promise<HttpResponse> {
		try {
			const data = await this.listUser.listAll();

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
