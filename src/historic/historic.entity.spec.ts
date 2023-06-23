import { Historic } from './historic.entity';
import { Message } from '../message/message.entity';

describe('Historic', () => {
  let historic: Historic;

  beforeEach(() => {
    historic = new Historic();
  });

  it('should add a message to the historic', () => {
    const message: Message = {
      sender: { name: 'fulano', email: 'fulano@hot.com' },
      receiver: { name: 'ciclana', email: 'ciclana@hot.com' },
      content: 'Hello my dear',
      createdAt: new Date(),
    };

    historic.addMessage(message);

    expect(historic.getMessages()).toContain(message);
  });
});
