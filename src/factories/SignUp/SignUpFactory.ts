import { CryptographyUseCase } from '../../data/usecase/Cryptography/CryptographyUseCase';
import { AddUserUseCase } from '../../data/usecase/User/AddUserUseCase';
import { UserMongoDBRepository } from '../../database/repositories/UserMongoDBRepository';
import { Controller } from '../../shared/interfaces/controller';
import { SignUpController } from './SignUpController';
import { SignUpValidation } from './SignUpValidation';

export const makeSignUpController = (): Controller => {
	const userMongoDBRepository = new UserMongoDBRepository();
	const cryptographyUseCase = new CryptographyUseCase();
	const addUserUseCase = new AddUserUseCase(userMongoDBRepository, cryptographyUseCase);
	const validate = new SignUpValidation();
	return new SignUpController(addUserUseCase, validate);
};
