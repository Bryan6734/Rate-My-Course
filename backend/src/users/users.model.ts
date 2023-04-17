import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true, unique: true })
  googleId: string;

  @Prop({ required: true })
  accessToken: string;

  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true })
  graduationYear: number;

  @Prop({ required: true })
  email: string;

  @Prop()
  picture: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
