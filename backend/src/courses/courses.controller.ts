import { Controller, Get, Post, Body, Param, Patch, Query } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { Course } from './courses.model';

@Controller('courses')
export class CoursesController {
  constructor(private coursesService: CoursesService) {}

  @Get('/:id')
  async getCourse(@Param('id') id: string): Promise<Course> {
    console.log("runnig getCourse")
    return this.coursesService.getCourse(id);
  }

  @Get('ids/multiple')
  async getCoursesByIds(@Query('ids') ids: string): Promise<Course[]> {
    // convert query ids to list
    const allIds: string[] = ids.split(',');
    return this.coursesService.getCoursesByIds(allIds);
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

  @Patch(':id')
  async updateCourse(
    @Param('id') id: string,
    @Body() course: Course,
  ): Promise<Course> {
    return this.coursesService.updateCourse(id, course);
  }
}
