import { CryptographyUseCase } from '../../data/usecase/Cryptography/CryptographyUseCase';
import { LoginUserUseCase } from '../../data/usecase/User/LoginUserUseCase';
import { LogMongoDBRepository } from '../../database/repositories/LogMongoDBRepository';
import { UserMongoDBRepository } from '../../database/repositories/UserMongoDBRepository';
import { MessageService } from '../../infra/queue/Messages';
import { Controller } from '../../shared/interfaces/controller';
import { LoginUserController } from './LoginUserController';

export const makeLoginUserController = (): Controller => {
	const userMongoDBRepository = new UserMongoDBRepository();
	const logMongoDBRepository = new LogMongoDBRepository();
	const cryptographyUseCase = new CryptographyUseCase();
	const loginUserUseCase = new LoginUserUseCase(userMongoDBRepository, cryptographyUseCase);
	const messages = new MessageService('user_logged_in', logMongoDBRepository);
	messages.connect();
	return new LoginUserController(loginUserUseCase, messages);
};
