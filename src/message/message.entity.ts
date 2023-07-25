import { User } from '../users/user.entity';

export class Message {
  id: bigint;
  sender: User;
  receiver: User;
  content: string;
  createdAt: Date;
  messages: Message[];

  constructor(sender: User, receiver: User, content: string) {
    this.sender = sender;
    this.receiver = receiver;
    this.content = content;
    this.createdAt = new Date();
    this.messages = [];
  }

  isValid(): boolean {
    return (
      this.sender !== null && this.receiver !== null && this.content !== null
    );
  }
}
