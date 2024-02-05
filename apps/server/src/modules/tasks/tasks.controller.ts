import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Prisma } from '@prisma/client';
import { JwtAuthGuard } from '~/modules/auth/guards/jwt-auth.guard';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createTaskDto: Prisma.TaskUncheckedCreateInput) {
    return this.tasksService.create(createTaskDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.tasksService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Patch('updateMany')
  updateMany(@Body() updateTaskDto: Prisma.TaskUncheckedCreateInput[]) {
    return this.tasksService.updateMany(updateTaskDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tasksService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTaskDto: Prisma.TaskUncheckedUpdateInput,
  ) {
    return this.tasksService.update(+id, updateTaskDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tasksService.remove(+id);
  }
}
