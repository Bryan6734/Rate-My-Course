import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ReviewDocument = Review & Document;

@Schema()
export class Review {
  @Prop()
  humorRating: number;

  @Prop()
  clarity: number;

  @Prop()
  organization: number;

  @Prop()
  grading: number;

  @Prop()
  teacherName: string;

  @Prop()
  description: string;

  @Prop()
  id: string;
}

export const ReviewSchema = SchemaFactory.createForClass(Review);
