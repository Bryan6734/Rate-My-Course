import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Review, ReviewSchema } from './reviews.model';
import { ReviewsController } from './reviews.controller';
import { ReviewsService } from './reviews.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Review.name', schema: ReviewSchema }]),
  ], 
  controllers: [ReviewsController],
  providers: [ReviewsService],
})
export class ReviewsModule {}
