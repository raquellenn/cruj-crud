export class User {
  name: string;
  email: string;
  id?: bigint;

  constructor(id, name: string, email: string) {
    this.id = id;
    this.name = name;
    this.email = email;
  }
}
