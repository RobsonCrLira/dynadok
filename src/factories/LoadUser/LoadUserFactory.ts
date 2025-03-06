import { LoadUserUseCase } from '../../data/usecase/User/LoadUserUseCase';
import { UserMongoDBRepository } from '../../database/repositories/UserMongoDBRepository';
import { Controller } from '../../shared/interfaces/controller';
import { IUserUseCase } from '../../shared/interfaces/userUseCase';
import { LoadUserController } from './LoadUserController';

export const makeLoadUserController = (): Controller => {
	const userMongoDBRepository = new UserMongoDBRepository();
	const loadUserUseCase: IUserUseCase = new LoadUserUseCase(userMongoDBRepository);
	return new LoadUserController(loadUserUseCase);
};
