import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Course, CourseDocument } from './courses.model';

@Injectable()
export class CoursesService {
  constructor(
    @InjectModel('Course.name') private courseModel: Model<CourseDocument>,
  ) { }
  

  async getCourse(id: string): Promise<Course> {
    return this.courseModel.findById(id).exec();
  }

  async getAllCourses(): Promise<Course[]> {
    return this.courseModel.find().exec();
  }

  async postCourse(course: Course): Promise<Course> {
    const newCourse = new this.courseModel(course);
    return newCourse.save();
  }

  async getTeacherIds(courseId: string): Promise<string[]> {
    const course = await this.courseModel.findById(courseId).exec();
    return course.teachers;
  }

  async getReviewIds(courseId: string): Promise<string[]> {
    const course = await this.courseModel.findById(courseId).exec();
    return course.reviews;
  }

  async updateCourse(course: Course): Promise<Course> {
    return this.courseModel.findByIdAndUpdate(course.id, course, {
      new: true,
    });
  }
}
