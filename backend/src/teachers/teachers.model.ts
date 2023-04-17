import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ObjectId } from 'mongodb';

export type TeacherDocument = Teacher & Document;

@Schema()
export class Teacher {
  @Prop({ default: () => new ObjectId() })
  _id: ObjectId;

  @Prop()
  name: string;

  @Prop()
  department: string;

  @Prop()
  image: string;

  @Prop()
  email: string;
}

export const TeacherSchema = SchemaFactory.createForClass(Teacher);
