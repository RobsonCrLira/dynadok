import { CryptographyUseCase } from "../../data/usecase/Cryptography/CryptographyUseCase";
import { AddUserUseCase } from "../../data/usecase/User/AddUserUseCase";
import { LogMongoDBRepository } from "../../database/repositories/LogMongoDBRepository";
import { UserMongoDBRepository } from "../../database/repositories/UserMongoDBRepository";
import { MessageService } from "../../infra/queue/Messages";
import { Controller } from "../../shared/interfaces/controller";
import { SignUpController } from "./SignUpController";
import { SignUpValidation } from "./SignUpValidation";

export const makeSignUpController = (): Controller => {
	const logMongoDBRepository = new LogMongoDBRepository();
	const userMongoDBRepository = new UserMongoDBRepository();
	const cryptographyUseCase = new CryptographyUseCase();
	const addUserUseCase = new AddUserUseCase(userMongoDBRepository, cryptographyUseCase);
	const validate = new SignUpValidation();
	const messages = new MessageService("user_created", logMongoDBRepository);
	messages.connect();
	return new SignUpController(addUserUseCase, validate, messages);
};
