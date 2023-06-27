import { Historic } from './historic.entity';
import { Message } from '../message/message.entity';
import { User } from '../users/user.entity';

describe('Historic', () => {
  let historic: Historic;

  beforeEach(() => {
    historic = new Historic();
  });

  it('should add a message to the historic', () => {
    const userSender = new User(2n, 'fulano', 'fulano@hot.com');
    const userReceiver = new User(1n, 'ciclana', 'ciclana@hot.com');

    const message = new Message(userSender, userReceiver, 'Hello my dear');

    historic.addMessage(message);

    expect(historic.getMessages()).toContain(message);
  });
  it('should sort the messages by date', () => {
    const userSender = new User(2n, 'fulano', 'fulano@hot.com');
    const userReceiver = new User(1n, 'ciclana', 'ciclana@hot.com');

    const message1 = new Message(userSender, userReceiver, 'Message 1');
    message1.createdAt = new Date('2023-01-01');

    const message2 = new Message(userSender, userReceiver, 'Message 2');
    message2.createdAt = new Date('2023-01-02');

    const message3 = new Message(userSender, userReceiver, 'Message 3');
    message3.createdAt = new Date('2023-01-03');

    historic.addMessage(message3);
    historic.addMessage(message1);
    historic.addMessage(message2);

    const messages = historic.getMessages();

    for (let i = 1; i < messages.length; i++) {
      const currentMessage = messages[i];
      const previousMessage = messages[i - 1];

      expect(currentMessage.createdAt.getTime()).toBeGreaterThan(
        previousMessage.createdAt.getTime(),
      );
    }
  });
});
