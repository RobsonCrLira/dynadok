import { AddUserUseCase } from '../../data/usecase/User/AddUserUseCase';
import { RabbitMQService } from '../../infra/queue/Messages';
import { badRequest, badRequestCustom, created, serverError } from '../../shared/http/httpHelpers';
import { Controller } from '../../shared/interfaces/controller';
import { HttpRequest, HttpResponse } from '../../shared/interfaces/http';
import { Validation } from '../../shared/interfaces/validation';
import { ICreateUserSchema } from './CreateUserValidation';

export class CreateUserController implements Controller {
	constructor(
		private readonly addUserUseCase: AddUserUseCase,
		private readonly validate: Validation<ICreateUserSchema>,
		private readonly messageProducer: RabbitMQService,
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

			await this.messageProducer.sendMessage(JSON.stringify({ userId: response.user_id }));

			return created({ message: 'Usuário Criado com sucesso!' });
		} catch (error) {
			console.error(error);
			return serverError(error);
		}
	}
}
