import { ListUserUseCase } from '../../data/usecase/User/ListUserUseCase';
import { UserMongoDBRepository } from '../../database/repositories/UserMongoDBRepository';
import { Controller } from '../../shared/interfaces/controller';
import { ListUserController } from './ListUserController';

export const makeListUserController = (): Controller => {
	const userMongoDBRepository = new UserMongoDBRepository();
	const listUser = new ListUserUseCase(userMongoDBRepository);
	return new ListUserController(listUser);
};
