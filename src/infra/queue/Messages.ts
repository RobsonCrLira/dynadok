import amqp from 'amqplib';

export class MessageService {
	private channel: amqp.Channel;

	constructor(private readonly queue: string) {}

	async connect() {
		const connection = await amqp.connect('amqp://localhost');
		this.channel = await connection.createChannel();
		await this.channel.assertQueue(this.queue, { durable: true });
	}

	async consume() {
		this.channel.consume(this.queue, (msg) => {
			if (msg !== null) {
				console.log(`Received message: ${msg.content.toString()}`);
				this.channel.ack(msg);
			}
		});
	}

	async sendMessage(message: string) {
		this.channel.sendToQueue(this.queue, Buffer.from(message), { persistent: true });
	}
}
