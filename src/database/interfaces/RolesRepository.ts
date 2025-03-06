import { z } from "zod";

const schema = z.object({
	role_id: z.number(),
	name: z.string(),
});

export type IRole = z.infer<typeof schema>;

export interface RolesRepository {
	getAll(): Promise<IRole[]>;
	findByName(name: string): Promise<IRole | null>;
}
