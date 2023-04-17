import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Teacher, TeacherDocument } from './teachers.model';

@Injectable()
export class TeachersService {
  constructor(
    @InjectModel('Teacher.name') private teacherModel: Model<TeacherDocument>,
  ) {}

  async getTeacher(id: string): Promise<Teacher> {
    let teacher;
    try {
      teacher = await this.teacherModel.findById(id).exec();
    } catch (error) {
      throw new NotFoundException('Could not find teacher.');
    }
    if (!teacher) {
      throw new NotFoundException('Could not find teacher.');
    }

    return this.teacherModel.findById(id).exec();
  }

  async postTeacher(teacher: Teacher): Promise<Teacher> {
    const newTeacher = new this.teacherModel(teacher);
    return newTeacher.save();
  }
}
