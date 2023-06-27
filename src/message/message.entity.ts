import { User } from '../users/user.entity';

export class Message {
  sender: User;
  receiver: User;
  content: string;
  createdAt: Date;

  constructor(sender: User, receiver: User, content: string) {
    this.sender = sender;
    this.receiver = receiver;
    this.content = content;
    this.createdAt = new Date();
  }

  isValid(): boolean {
    return (
      this.sender !== null && this.receiver !== null && this.content !== null
    );
  }
}
