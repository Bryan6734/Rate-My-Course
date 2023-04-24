import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Course, CourseDocument } from './courses.model';
import { ObjectId } from 'mongodb';

@Injectable()
export class CoursesService {
  constructor(
    @InjectModel('Course.name') private courseModel: Model<CourseDocument>,
  ) {}

  async getCourse(id: string): Promise<Course> {
    let course;
    try {
      course = await this.courseModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException('Could not find course.');
    }
    if (!course) {
      throw new NotFoundException('Could not find course.');
    }

    return course;

  }

  async getCoursesByIds(ids: string[]): Promise<Course[]> {
    if (ids.length === 0 || ids === undefined) {
      throw new NotFoundException('Could not find courses.');
    }

    const emptyList = ids.every(id => id === '');
    if (emptyList) {
      throw new NotFoundException('Could not find courses.');
    }

    const objectIds = ids.map(id => {
      console.log(id);
      return new ObjectId(id);
    });

    let courses;
    try {
      courses = await this.courseModel.find({
        _id: {
          $in: objectIds
        }
      }).exec();
    } catch (error) {
      throw new NotFoundException('Could not find courses.');
    }


    return courses;


  }

  async getAllCourses(): Promise<Course[]> {
    return this.courseModel.find().exec();
  }

  async postCourse(course: Course): Promise<Course> {
    const newCourse = new this.courseModel(course);
    return newCourse.save();
  }

  async getTeacherIds(id: string): Promise<string[]> {
    let course;
    try {
      course = await this.courseModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException('Could not find course.');
    }
    if (!course) {
      throw new NotFoundException('Could not find course.');
    } else if (!course.teachers) {
      throw new NotFoundException('Could not find teachers.');
    }

    return course.teachers;
  }

  async getReviewIds(id: string): Promise<string[]> {
    let course;
    try {
      course = await this.courseModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException('Could not find course.');
    }
    if (!course) {
      throw new NotFoundException('Could not find course.');
    } else if (!course.reviews) {
      throw new NotFoundException('Could not find reviews.');
    }

    return course.reviews;
  }

  async updateCourse(id: string, course: Course): Promise<Course> {

    let updatedCourse;
    try {
      updatedCourse = await this.courseModel.findById(id).exec();
      console.log(updatedCourse);
    } catch (error) {
      throw new NotFoundException('Could not find course.');
    }
    if (!updatedCourse) {
      throw new NotFoundException('Could not find course.');
    }

    updatedCourse = Object.assign(updatedCourse, course);

    return updatedCourse.save();
  }
}
