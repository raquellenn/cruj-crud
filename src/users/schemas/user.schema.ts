import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { HydratedDocument } from 'mongoose';
import { User } from '../user.entity';

export const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
});

// export type UserDocument = HydratedDocument<User>;

// @Schema()
// export class User {
//   @Prop()
//   name: string;

//   @Prop({ required: true })
//   email: string;
// }

// export const UserSchema = SchemaFactory.createForClass(User);
