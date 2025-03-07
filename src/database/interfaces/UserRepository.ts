import { z } from "zod";

const userSchema = z.object({
	name: z.string(),
	email: z.string(),
	password: z.string(),
	password_hash: z.string().optional(),
	user_id: z.string().optional(),
	phone: z.string(),
	created_at: z.date().optional(),
	updated_at: z.date().optional(),
});

export const userUpdateSchema = userSchema;

export type IUser = z.infer<typeof userSchema>;
export type IUserUpdate = z.infer<typeof userUpdateSchema>;

export interface UserRepository {
	create(user: IUser): Promise<IUser>;
	findByEmail(email: string): Promise<IUser | null>;
	findById(id: string): Promise<IUser | null>;
	getAll(): Promise<IUser[]>;
	update(data: IUserUpdate): Promise<IUser | null>;
	updatePassword(user_id: string, password_hash: string): Promise<void>;
	delete(id: string): Promise<void>;
}
