import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Review, ReviewDocument } from './reviews.model';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectModel('Review.name') private reviewModel: Model<ReviewDocument>,
  ) {}

  async getReview(id: string): Promise<Review> {
    return this.reviewModel.findById(id).exec();
  }

  async postReview(review: Review): Promise<Review> {
    const newReview = new this.reviewModel(review);
    return newReview.save();
  }

  async deleteReview(id: string): Promise<any> {
    return this.reviewModel.findByIdAndDelete(id).exec();
  }

  async updateReview(review: Review): Promise<Review> {
    return this.reviewModel.findByIdAndUpdate(review.id, review, {
      new: true,
    });
  }

  async getTeacherIds(reviewId: string): Promise<string[]> {
    const review = await this.reviewModel.findById(reviewId).exec();
    const teacherId = review.teacherName;
    return [teacherId];
  }
}
