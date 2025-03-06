import { prisma } from "..";
import { ILog, LogRepository } from "../interfaces/LogRepository";

export class LogMongoDBRepository implements LogRepository {
	private readonly prisma;

	constructor() {
		this.prisma = prisma;
	}

	async createLog(log: ILog): Promise<void> {
		await this.prisma.logs.create({
			data: {
				user_id: log.user_id,
				log_type: log.log_type,
				log_data: log.log_data,
			},
		});
	}
}
