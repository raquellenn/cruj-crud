import { User } from '../users/user.entity';
import { Message } from '../message/message.entity';

describe('Message', () => {
  let sender: User;
  let receiver: User;
  let content: string;
  let message: Message;

  beforeEach(() => {
    sender = new User(1n, 'a', 'sender@example.com');
    receiver = new User(2n, 'c', 'receiver@example.com');
    content = 'Hello, world!';
    message = new Message(sender, receiver, content);
  });

  describe('isValid', () => {
    it('should return true when all properties are defined and content is not empty', () => {
      expect(message.isValid()).toBe(true);
    });

    it('should return false when sender is undefined', () => {
      message.sender = undefined;
      expect(message.isValid()).toBe(false);
    })
  });
});
