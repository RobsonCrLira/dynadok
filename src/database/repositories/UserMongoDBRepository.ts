import { prisma } from "..";
import { IUser, IUserUpdate, UserRepository } from "../interfaces/UserRepository";

export class UserMongoDBRepository implements UserRepository {
	private readonly prisma;

	constructor() {
		this.prisma = prisma;
	}
	async getAll(): Promise<IUser[]> {
		const users = await this.prisma.users.findMany();
		return users;
	}

	async update(data: IUserUpdate): Promise<IUser | null> {
		const update = await this.prisma.users.update({
			where: {
				user_id: data.user_id,
			},
			data: {
				user_name: data.name,
				user_email: data.email,
				user_password_hash: data.password_hash,
			},
		});
		return update;
	}

	async create(user: IUser): Promise<IUser> {
		const users = await this.prisma.users.create({
			data: {
				user_name: user.name,
				user_email: user.email,
				user_password_hash: user.password_hash,
			},
		});
		return users;
	}

	async findByEmail(email: string): Promise<IUser | null> {
		const user = await this.prisma.users.findUnique({
			where: {
				user_email: email,
			},
			select: {
				user_id: true,
				user_name: true,
				user_email: true,
				user_password_hash: true,
			},
		});
		if (!user) return null;

		return user;
	}

	async findById(id: string): Promise<IUser | null> {
		const user = await this.prisma.users.findUnique({
			where: {
				user_id: id,
			},
		});
		if (!user) return null;

		return user;
	}

	async delete(id: string): Promise<void> {
		await this.prisma.users.delete({
			where: {
				user_id: id,
			},
		});
	}
}
