import { MessageService } from './Messages';

const consumer = new MessageService('user_created');

consumer.connect().then(() => {
	console.log('Consumer connected');
	consumer.consume();
});
