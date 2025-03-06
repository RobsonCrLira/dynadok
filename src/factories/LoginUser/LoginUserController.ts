import { LoginUserUseCase } from "../../data/usecase/User/LoginUserUseCase";
import { MessageService } from "../../infra/queue/Messages";
import { badRequest, ok, serverError } from "../../shared/http/httpHelpers";
import { Controller } from "../../shared/interfaces/controller";
import { HttpRequest, HttpResponse } from "../../shared/interfaces/http";

export class LoginUserController implements Controller {
	constructor(
		private readonly loginUserUseCase: LoginUserUseCase,
		private readonly messageProducer: MessageService,
	) {}

	async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
		try {
			const data = await this.loginUserUseCase.execute(httpRequest.body);

			if (!data) {
				return badRequest(new Error("Invalid credentials"));
			}

			await this.messageProducer.sendMessage(
				JSON.stringify({
					user: {
						name: data.name,
						user_id: data.user_id,
						email: httpRequest.body.email,
						timestamp: new Date(),
					},
				}),
			);

			return ok({ token: data.token });
		} catch (error) {
			console.error(error);
			return serverError(error);
		}
	}
}
