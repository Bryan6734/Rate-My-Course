import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ReviewDocument = Review & Document;

// Every course will have a list of Ids which correspond to reviews
// Every review will have the userId and the teacherId associated

@Schema()
export class Review {
  @Prop({ required: true })
  userId: string;

  @Prop()
  teacherId: string;

  // How interesting/engaging was the content of the course?
  @Prop()
  content: number;

  // How difficult was the course?
  @Prop()
  difficulty: number;

  // How much work did the course require?
  @Prop()
  workload: number;

  // What was the pacing of the course like?
  @Prop()
  pacing: number;

  // How clear was the instructor of this course?
  @Prop()
  clarity: number;

  // How organized was the content and/or teacher? 
  @Prop()
  organization: number;

  // Please provide any additional comments about the course.
  @Prop()
  description: string;

}

export const ReviewSchema = SchemaFactory.createForClass(Review);
