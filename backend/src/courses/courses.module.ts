import { Module } from '@nestjs/common';
import { MongooseModule } from "@nestjs/mongoose";
import { Course, CourseSchema } from './courses.model';
import { CoursesController } from './courses.controller';
import { CoursesService } from './courses.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Course.name', schema: CourseSchema }]),
  ],
  controllers: [CoursesController],
  providers: [CoursesService],
})
export class CoursesModule {}
