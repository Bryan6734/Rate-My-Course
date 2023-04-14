import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { TeachersService } from './teachers.service';
import { Teacher } from './teachers.model';

@Controller('teachers')
export class TeachersController {
  constructor(private teachersService: TeachersService) {}

  @Get(':id')
  async getTeacher(@Param('id') id: string): Promise<Teacher> {
    return this.teachersService.getTeacher(id);
  }

  @Post()
  async postTeacher(@Body() teacher: Teacher): Promise<Teacher> {
    return this.teachersService.postTeacher(teacher);
  }
}
