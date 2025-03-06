import { LogMongoDBRepository } from "../../database/repositories/LogMongoDBRepository";
import { MessageService } from "./Messages";

const consumers = [
	{ name: "user_created", message: "User Created Consumer connected" },
	{ name: "user_logged_in", message: "User Logged In Consumer connected" },
];

consumers.forEach(({ name, message }) => {
	const consumer = new MessageService(name, new LogMongoDBRepository());
	consumer.connect().then(() => {
		console.log(message);
		consumer.consume();
	});
});
