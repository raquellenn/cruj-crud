import { Document } from 'mongoose';

export class User extends Document {
  name: string;
  email: string;

  constructor(name: string, email: string) {
    super();
    this.name = name;
    this.email = email;
  }
}
