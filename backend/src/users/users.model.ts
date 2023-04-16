import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ObjectId } from 'mongodb';

export type UserDocument = User & Document;

@Schema()
export class User {

  @Prop({ default: () => new ObjectId() })
  _id: ObjectId;

  @Prop({ required: true, unique: true })
  googleId: string;

  @Prop({ required: true })
  accessToken: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  email: string;

  @Prop()
  picture: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
