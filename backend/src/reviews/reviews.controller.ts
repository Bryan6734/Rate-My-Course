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
  async getTeacherIds(@Param('id') id: string): Promise<string[]> {
    return this.reviewsService.getTeacherIds(id);
  }
}
