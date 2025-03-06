import { MessageService } from "../../infra/queue/Messages";
import { badRequest, badRequestCustom, created, serverError } from "../../shared/http/httpHelpers";
import { Controller } from "../../shared/interfaces/controller";
import { HttpRequest, HttpResponse } from "../../shared/interfaces/http";
import { IUserUseCase } from "../../shared/interfaces/userUseCase";
import { Validation } from "../../shared/interfaces/validation";
import { ICreateUserSchema } from "./CreateUserValidation";

export class CreateUserController implements Controller {
	constructor(
		private readonly addUserUseCase: IUserUseCase,
		private readonly validate: Validation<ICreateUserSchema>,
		private readonly messageProducer: MessageService,
	) {}

	async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
		try {
			const validate = this.validate.validate(httpRequest.body);
			if (validate instanceof Error) {
				return badRequestCustom(validate);
			}
			const data = await this.addUserUseCase.execute(validate);

			if (data instanceof Error) {
				return badRequest(data);
			}

			await this.messageProducer.sendMessage(
				JSON.stringify({
					user: {
						name: data.name,
						user_id: data.user_id,
					},
				}),
			);

			return created({ message: "Usuário Criado com sucesso!" });
		} catch (error) {
			console.error(error);
			return serverError(error);
		}
	}
}
