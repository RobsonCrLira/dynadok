import amqp from "amqplib";
import { LogRepository } from "../../database/interfaces/LogRepository";

export class MessageService {
	private channel: amqp.Channel;

	constructor(
		private readonly queue: string,
		private readonly logRepository: LogRepository,
	) {}

	async connect() {
		const connection = await amqp.connect("amqp://localhost");
		this.channel = await connection.createChannel();
		await this.channel.assertQueue(this.queue, { durable: true });
	}

	async consume() {
		this.channel.consume(this.queue, async (msg) => {
			if (msg !== null) {
				const messageContent = msg.content.toString();
				const message = JSON.parse(messageContent);
				console.info(`Received message: ${messageContent}`);
				await this.logRepository.createLog({
					user_id: message.user.user_id,
					log_type: this.queue,
					log_data: JSON.parse(messageContent),
				});
				this.channel.ack(msg);
			}
		});
	}

	async sendMessage(message: string) {
		this.channel.sendToQueue(this.queue, Buffer.from(message), { persistent: true });
		const messageContent = JSON.parse(message);
		await this.logRepository.createLog({
			user_id: messageContent.user.user_id,
			log_type: this.queue,
			log_data: JSON.parse(message),
		});
	}
}
