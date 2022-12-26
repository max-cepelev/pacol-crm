import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProjectStatusesService } from './project-statuses.service';
import { Prisma } from '@prisma/client';

@Controller('project-statuses')
export class ProjectStatusesController {
  constructor(
    private readonly projectStatusesService: ProjectStatusesService,
  ) {}

  @Post()
  create(
    @Body() createProjectStatusDto: Prisma.ProjectStatusUncheckedCreateInput,
  ) {
    return this.projectStatusesService.create(createProjectStatusDto);
  }

  @Get()
  findAll() {
    return this.projectStatusesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.projectStatusesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateProjectStatusDto: Prisma.ProjectStatusUncheckedUpdateInput,
  ) {
    return this.projectStatusesService.update(+id, updateProjectStatusDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.projectStatusesService.remove(+id);
  }
}
