import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TeachersModule } from './teachers/teachers.module';
import { ReviewsModule } from './reviews/reviews.module';
import { CoursesModule } from './courses/courses.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    CoursesModule,
    TeachersModule,
    ReviewsModule,
    MongooseModule.forRoot(
      'mongodb+srv://MJoseph24:MJoseph24@cluster0.jeo1kca.mongodb.net/test',
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
