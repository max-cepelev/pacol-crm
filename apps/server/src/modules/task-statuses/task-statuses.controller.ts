import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { TaskStatusesService } from './task-statuses.service';
import { Prisma } from '@prisma/client';
import { stringToInt } from 'src/utils/stringTransform';
import { JwtAuthGuard } from '~/modules/auth/guards/jwt-auth.guard';
import { Req } from '@nestjs/common/decorators';

@Controller('task-statuses')
export class TaskStatusesController {
  constructor(private readonly taskStatusesService: TaskStatusesService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createTaskStatusDto: Prisma.TaskStatusUncheckedCreateInput) {
    return this.taskStatusesService.create(createTaskStatusDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(
    @Req() req,
    @Query('userId') userId?: string,
    @Query('distributorId') distributorId?: string,
  ) {
    return this.taskStatusesService.findAll({
      distributorId: req?.user?.distributorId || stringToInt(distributorId),
      userId: stringToInt(userId),
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.taskStatusesService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTaskStatusDto: Prisma.TaskStatusUncheckedUpdateInput,
  ) {
    return this.taskStatusesService.update(+id, updateTaskStatusDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.taskStatusesService.remove(+id);
  }
}
