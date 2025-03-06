export interface IUserUseCase {
	execute(data: any): Promise<any>;
}
