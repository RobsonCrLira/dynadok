import { AddUserUseCase } from "../../data/usecase/User/AddUserUseCase";
import { badRequest, badRequestCustom, created, serverError } from "../../shared/http/httpHelpers";
import { Controller } from "../../shared/interfaces/controller";
import { HttpRequest, HttpResponse } from "../../shared/interfaces/http";
import { Validation } from "../../shared/interfaces/validation";
import { ISignUpSchema } from "./SignUpValidation";

export class SignUpController implements Controller {
	constructor(
		private readonly addUserUseCase: AddUserUseCase,
		private readonly validate: Validation<ISignUpSchema>,
	) {}
	async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
		try {
			const validate = this.validate.validate(httpRequest.body);
			if (validate instanceof Error) {
				return badRequestCustom(validate);
			}
			const response = await this.addUserUseCase.add(validate);

			if (response instanceof Error) {
				return badRequest(response);
			}
			return created({ message: "Usuário Criado com sucesso!" });
		} catch (error) {
			console.error(error);
			return serverError(error);
		}
	}
}
