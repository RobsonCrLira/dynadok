import { CryptographyUseCase } from "../../data/usecase/Cryptography/CryptographyUseCase";
import { AddUserUseCase } from "../../data/usecase/User/AddUserUseCase";
import { LogMongoDBRepository } from "../../database/repositories/LogMongoDBRepository";
import { UserMongoDBRepository } from "../../database/repositories/UserMongoDBRepository";
import { MessageService } from "../../infra/queue/Messages";
import { Controller } from "../../shared/interfaces/controller";
import { IUserUseCase } from "../../shared/interfaces/userUseCase";
import { CreateUserController } from "./CreateUserController";
import { CreateUserValidation } from "./CreateUserValidation";

export const makeCreateUserController = (): Controller => {
	const userMongoDBRepository = new UserMongoDBRepository();
	const logMongoDBRepository = new LogMongoDBRepository();
	const cryptographyUseCase = new CryptographyUseCase();
	const addUserUseCase: IUserUseCase = new AddUserUseCase(userMongoDBRepository, cryptographyUseCase);
	const validate = new CreateUserValidation();
	const messages = new MessageService("user_created", logMongoDBRepository);
	messages.connect();
	return new CreateUserController(addUserUseCase, validate, messages);
};
