import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TaskStatusesService } from './task-statuses.service';
import { Prisma } from '@prisma/client';

@Controller('task-statuses')
export class TaskStatusesController {
  constructor(private readonly taskStatusesService: TaskStatusesService) {}

  @Post()
  create(@Body() createTaskStatusDto: Prisma.TaskStatusUncheckedCreateInput) {
    return this.taskStatusesService.create(createTaskStatusDto);
  }

  @Get()
  findAll() {
    return this.taskStatusesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.taskStatusesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTaskStatusDto: Prisma.TaskStatusUncheckedUpdateInput,
  ) {
    return this.taskStatusesService.update(+id, updateTaskStatusDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.taskStatusesService.remove(+id);
  }
}
