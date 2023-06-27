import { User } from 'src/users/user.entity';
import { Message } from '../message/message.entity';

export class Historic {
  messages: Message[];

  constructor() {
    this.messages = [];
  }

  addMessage(message: Message) {
    this.messages.push(message);
  }

  getMessages(): Message[] {
    // Ordena as mensagens em ordem cronológica (da mais recente à mais antiga)
    return this.messages.sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime(),
    );
  }

  searchMessagesBySender(sender: User): Message[] {
    // Filtra as mensagens pelo remetente
    return this.messages.filter((message) => message.sender === sender);
  }

  searchMessagesByReceiver(receiver: User): Message[] {
    // Filtra as mensagens pelo destinatário
    return this.messages.filter((message) => message.receiver === receiver);
  }

  searchMessagesByContent(content: string): Message[] {
    // Filtra as mensagens pelo conteúdo
    return this.messages.filter((message) => message.content.includes(content));
  }
}
