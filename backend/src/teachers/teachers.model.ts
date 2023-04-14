import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TeacherDocument = Teacher & Document;

@Schema()
export class Teacher {
  @Prop()
  name: string;

  @Prop()
  department: string;

  @Prop()
  image: string;

  @Prop()
  email: string;

  @Prop()
  id: string;
}

export const TeacherSchema = SchemaFactory.createForClass(Teacher);