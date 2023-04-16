import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ObjectId } from 'mongodb';

export type CourseDocument = Course & Document;

@Schema()
export class Course {
  
  @Prop({ default: () => new ObjectId() })
  _id: ObjectId;

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
