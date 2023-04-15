import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CourseDocument = Course & Document;

@Schema()
export class Course {
  @Prop()
  name: string;

  @Prop()
  notes: string;

  @Prop()
  description: string;

  @Prop()
  department: string;

  @Prop()
  teachers: string[];

  @Prop()
  reviews: string[];

  @Prop()
  id: string;
}

export const CourseSchema = SchemaFactory.createForClass(Course);
