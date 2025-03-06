import { z } from "zod";

const logSchema = z.object({
	user_id: z.string(),
	log_type: z.string(),
	log_data: z.object({}),
	created_at: z.date().optional(),
});

export type ILog = z.infer<typeof logSchema>;

export interface LogRepository {
	createLog(log: ILog): Promise<void>;
}
