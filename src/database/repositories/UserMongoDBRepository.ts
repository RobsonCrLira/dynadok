import { prisma } from "..";
import { IUser, IUserUpdate, UserRepository } from "../interfaces/UserRepository";

export class UserMongoDBRepository implements UserRepository {
	private readonly prisma;

	constructor() {
		this.prisma = prisma;
	}
	private mapUser(user: {
		user_name: string;
		user_email: string;
		user_password_hash?: string;
		user_id: string;
		user_phone: string;
		created_at: Date;
		updated_at: Date;
	}): IUser {
		return {
			name: user.user_name,
			email: user.user_email,
			phone: user.user_phone,
			password_hash: user.user_password_hash,
			user_id: user.user_id,
		};
	}

	async updatePassword(user_id: string, password_hash: string): Promise<void> {
		await this.prisma.users.update({
			where: {
				user_id: user_id,
			},
			data: {
				user_password_hash: password_hash,
			},
		});
	}

	async getAll(): Promise<IUser[]> {
		const users = await this.prisma.users.findMany({
			select: {
				user_id: true,
				user_name: true,
				user_email: true,
				user_phone: true,
				created_at: true,
				updated_at: true,
			},
		});
		return users.map((user) => this.mapUser(user));
	}

	async update(data: IUserUpdate): Promise<IUser | null> {
		const update = await this.prisma.users.update({
			where: {
				user_id: data.user_id,
			},
			data: {
				user_name: data.name,
				user_email: data.email,
			},
		});
		return this.mapUser(update);
	}

	async create(user: IUser): Promise<IUser> {
		const users = await this.prisma.users.create({
			data: {
				user_name: user.name,
				user_email: user.email,
				user_password_hash: user.password_hash,
				user_phone: user.phone,
			},
		});
		return this.mapUser(users);
	}

	async findByEmail(email: string): Promise<IUser | null> {
		const user = await this.prisma.users.findUnique({
			where: {
				user_email: email,
			},
		});
		if (!user) return null;

		return this.mapUser(user);
	}

	async findById(id: string): Promise<IUser | null> {
		const user = await this.prisma.users.findUnique({
			where: {
				user_id: id,
			},
		});
		if (!user) return null;

		return this.mapUser(user);
	}

	async delete(id: string): Promise<void> {
		await this.prisma.users.delete({
			where: {
				user_id: id,
			},
		});
	}
}
