import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Teacher, TeacherSchema } from './teachers.model';
import { TeachersController } from './teachers.controller';
import { TeachersService } from './teachers.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Teacher.name', schema: TeacherSchema }]),
  ],
  controllers: [TeachersController],
  providers: [TeachersService],
})
export class TeachersModule {}

