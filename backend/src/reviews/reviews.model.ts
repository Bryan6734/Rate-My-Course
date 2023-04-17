import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ObjectId } from 'mongodb';

export type ReviewDocument = Review & Document;

// Every course will have a list of Ids which correspond to reviews
// Every review will have the userId and the teacherId associated

@Schema()
export class Review {

  @Prop({ required: true })
  userId: string;

  // Originally, we weren't going to store the courseId in the review as the parent would already have it.
  // However, for scalability, this may be the better option.
  @Prop({ required: true })
  courseId: string;

  @Prop()
  teacherId: string;

  @Prop({ required: true })
  title: string;

  // How interesting/engaging was the content of the course?
  @Prop({ required: true })
  content: number;

  // How difficult was the course?
  @Prop({ required: true })
  difficulty: number;

  // How much work did the course require?
  @Prop({ required: true })
  workload: number;

  // What was the pacing of the course like?
  @Prop({ required: true })
  pacing: number;

  // How clear was the instructor of this course?
  @Prop({ required: true })
  clarity: number;

  // How organized was the content and/or teacher?
  @Prop({ required: true })
  organization: number;

  // Please provide any additional comments about the course.
  @Prop()
  description: string;
}

export const ReviewSchema = SchemaFactory.createForClass(Review);
