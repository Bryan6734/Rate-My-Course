import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Put,
  Param,
} from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { Review } from './reviews.model';

@Controller('reviews')
export class ReviewsController {
  constructor(private reviewsService: ReviewsService) {}

  @Get(':id')
  async getReview(@Param('id') id: string): Promise<Review> {
    return this.reviewsService.getReview(id);
  }

  @Get('course/:id')
  async getReviewsByCourseId(@Param('id') courseId: string): Promise<Review[]> {
    return this.reviewsService.getReviewsByCourseId(courseId);
  }

  @Post()
  async postReview(@Body() review: Review): Promise<Review> {
    return this.reviewsService.postReview(review);
  }

  @Delete(':id')
  async deleteReview(@Param('id') id: string): Promise<any> {
    return this.reviewsService.deleteReview(id);
  }

  @Put()
  async updateReview(@Body() review: Review): Promise<Review> {
    return this.reviewsService.updateReview(review);
  }

  @Get(':id/teachers')
  async getTeacherIds(@Param('id') id: string): Promise<string> {
    return this.reviewsService.getTeacherId(id);
  }
}
