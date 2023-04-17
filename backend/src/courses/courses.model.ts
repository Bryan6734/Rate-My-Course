import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';


export type CourseDocument = Course & Document;

@Schema()
export class Course {
  @Prop({ required: true })
  name: string;

  @Prop()
  notes: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  department: string;

  @Prop()
  teachers: string[];

  @Prop()
  reviews: string[];
}

export const CourseSchema = SchemaFactory.createForClass(Course);
