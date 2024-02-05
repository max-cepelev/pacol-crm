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
import { ProjectStatusesService } from './project-statuses.service';
import { Prisma } from '@prisma/client';
import { JwtAuthGuard } from '~/modules/auth/guards/jwt-auth.guard';

@Controller('project-statuses')
export class ProjectStatusesController {
  constructor(
    private readonly projectStatusesService: ProjectStatusesService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Body() createProjectStatusDto: Prisma.ProjectStatusUncheckedCreateInput,
  ) {
    return this.projectStatusesService.create(createProjectStatusDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.projectStatusesService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.projectStatusesService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateProjectStatusDto: Prisma.ProjectStatusUncheckedUpdateInput,
  ) {
    return this.projectStatusesService.update(+id, updateProjectStatusDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.projectStatusesService.remove(+id);
  }
}
