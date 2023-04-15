import { Controller, Get, Post, Body, Param, Put } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { Course } from './courses.model';

@Controller('courses')
export class CoursesController {
  constructor(private coursesService: CoursesService) {}

  @Get(':id')
  async getCourse(@Param('id') id: string): Promise<Course> {
    return this.coursesService.getCourse(id);
  }

  @Get()
  async getAllCourses(): Promise<Course[]> {
    return this.coursesService.getAllCourses();
  }

  @Post()
  async postCourse(@Body() course: Course): Promise<Course> {
    return this.coursesService.postCourse(course);
  }

  @Get(':id/teachers')
  async getTeacherIds(@Param('id') id: string): Promise<string[]> {
    return this.coursesService.getTeacherIds(id);
  }

  @Get(':id/reviews')
  async getReviewIds(@Param('id') id: string): Promise<string[]> {
    return this.coursesService.getReviewIds(id);
  }

  @Put()
  async updateCourse(@Body() course: Course): Promise<Course> {
    return this.coursesService.updateCourse(course);
  } 
}
