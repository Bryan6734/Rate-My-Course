import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Put,
  Param,
  Patch,
} from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { Review } from './reviews.model';

@Controller('reviews')
export class ReviewsController {
  constructor(private reviewsService: ReviewsService) {}

  @Get()
  async getAllReviews(): Promise<Review[]> {
    return this.reviewsService.getAllReviews();
  }

  @Get(':id')
  async getReview(@Param('id') id: string): Promise<Review> {
    return this.reviewsService.getReview(id);
  }

  @Get('course/:id')
  async getReviewsByCourseId(@Param('id') courseId: string): Promise<Review[]> {
    return this.reviewsService.getReviewsByCourseId(courseId);
  }

  @Get('user/:id')
  async getReviewsByUserId(@Param('id') userId: string): Promise<Review[]> {
    return this.reviewsService.getReviewsByUserId(userId);
  }

  @Post()
  async postReview(@Body() review: Review): Promise<Review> {
    return this.reviewsService.postReview(review);
  }

  @Delete(':id')
  async deleteReview(@Param('id') id: string): Promise<any> {
    return this.reviewsService.deleteReview(id);
  }

  @Patch(':id')
  async updateReview(
    @Param('id') id: string,
    @Body() review: Review,
  ): Promise<Review> {
    return this.reviewsService.updateReview(id, review);
  }
}

