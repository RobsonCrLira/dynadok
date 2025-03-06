import { CryptographyUseCase } from '../../data/usecase/Cryptography/CryptographyUseCase';
import { AddUserUseCase } from '../../data/usecase/User/AddUserUseCase';
import { UserMongoDBRepository } from '../../database/repositories/UserMongoDBRepository';
import { Controller } from '../../shared/interfaces/controller';
import { UpdateUserController } from './UpdateUserController';
import { UpdateUserValidation } from './UpdateUserValidation';

export const makeUpdateUserController = (): Controller => {
	const userMongoDBRepository = new UserMongoDBRepository();
	const cryptographyUseCase = new CryptographyUseCase();
	const addUserUseCase = new AddUserUseCase(userMongoDBRepository, cryptographyUseCase);
	const validate = new UpdateUserValidation();
	return new UpdateUserController(addUserUseCase, validate);
};
