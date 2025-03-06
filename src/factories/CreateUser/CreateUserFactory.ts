import { CryptographyUseCase } from "../../data/usecase/Cryptography/CryptographyUseCase";
import { AddUserUseCase } from "../../data/usecase/User/AddUserUseCase";
import { UserMongoDBRepository } from "../../database/repositories/UserMongoDBRepository";
import { Controller } from "../../shared/interfaces/controller";
import { CreateUserController } from "./CreateUserController";
import { CreateUserValidation } from "./CreateUserValidation";

export const makeCreateUserController = (): Controller => {
	const userMongoDBRepository = new UserMongoDBRepository();
	const cryptographyUseCase = new CryptographyUseCase();
	const addUserUseCase = new AddUserUseCase(userMongoDBRepository, cryptographyUseCase);
	const validate = new CreateUserValidation();
	return new CreateUserController(addUserUseCase, validate);
};
