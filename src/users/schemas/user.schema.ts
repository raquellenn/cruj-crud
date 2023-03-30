import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { HydratedDocument } from 'mongoose';
import { User } from '../user.entity';

export const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
});

export type UserDocument = HydratedDocument<User>;

@Schema()
export class Users extends Document {
  @Prop()
  name: string;

  @Prop({ required: true })
  email: string;
}

// export const UserSchema = SchemaFactory.createForClass(Users);
