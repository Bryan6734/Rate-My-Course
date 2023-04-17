import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Review, ReviewDocument } from './reviews.model';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectModel('Review.name') private reviewModel: Model<ReviewDocument>,
  ) {}

  async getReview(id: string): Promise<Review> {
    let review;

    try {
      review = await this.reviewModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException('Could not find review.');
    }
    if (!review) {
      throw new NotFoundException('Could not find review.');
    }

    return review;
  }

  async getReviewsByCourseId(courseId: string): Promise<Review[]> {
    let review;
    try {
      review = await this.reviewModel.find({ courseId: courseId }).exec();
    } catch (error) {
      throw new NotFoundException('Could not find review.');
    }
    if (!review) {
      throw new NotFoundException('Could not find review.');
    }

    return review;
  }


  async getReviewsByGoogleId(googleId: string): Promise<Review[]> {
    let review;
    try {
      review = await this.reviewModel.find({ googleId: googleId }).exec();
    } catch (error) {
      console.log("Error finding")
      throw new NotFoundException('Could not find review.');
    }
    if (!review) {
      throw new NotFoundException('Could not find review.');
    }

    return review;
  }



  async getAllReviews(): Promise<Review[]> {
    return this.reviewModel.find().exec();
  }

  async postReview(review: Review): Promise<Review> {
    const newReview = new this.reviewModel(review);
    return newReview.save();
  }

  async deleteReview(id: string): Promise<any> {
    let review;
    try {
      review = await this.reviewModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException('Could not find review.');
    }
    if (!review) {
      throw new NotFoundException('Could not find review.');
    }

    return review;
  }

  async updateReview(id: string, review: Review): Promise<Review> {

    let updatedReview;
    try {
      updatedReview = await this.reviewModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException('Could not find review.');
    }
    if (!updatedReview) {
      throw new NotFoundException('Could not find review.');
    }

    updatedReview = Object.assign(updatedReview, review);

    return updatedReview.save();

  }
}
