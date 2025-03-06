import { LoadUserUseCase } from "../../data/usecase/User/LoadUserUseCase";
import { UserMongoDBRepository } from "../../database/repositories/UserMongoDBRepository";
import { Controller } from "../../shared/interfaces/controller";
import { LoadUserController } from "./LoadUserController";

export const makeLoadUserController = (): Controller => {
	const userMongoDBRepository = new UserMongoDBRepository();
	const loadUser = new LoadUserUseCase(userMongoDBRepository);
	return new LoadUserController(loadUser);
};
