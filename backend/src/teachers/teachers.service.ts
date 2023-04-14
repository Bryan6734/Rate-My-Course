import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Teacher, TeacherDocument } from './teachers.model';

@Injectable()
export class TeachersService {
  constructor(
    @InjectModel('Teacher.name') private teacherModel: Model<TeacherDocument>,
  ) {}

  async getTeacher(id: string): Promise<Teacher> {
    return this.teacherModel.findById(id).exec();
  }

  async postTeacher(teacher: Teacher): Promise<Teacher> {
    const newTeacher = new this.teacherModel(teacher);
    return newTeacher.save();
  }
}
