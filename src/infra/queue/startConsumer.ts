import { RabbitMQService } from './Messages';

const consumer = new RabbitMQService('user_created');

consumer.connect().then(() => {
	console.log('Consumer connected');
	consumer.consume();
});
