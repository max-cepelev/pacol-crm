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
import { ProjectsService } from './projects.service';
import { Prisma } from '@prisma/client';
import { stringToInt } from 'src/utils/stringTransform';
import { JwtAuthGuard } from '~/modules/auth/guards/jwt-auth.guard';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createProjectDto: Prisma.ProjectUncheckedCreateInput) {
    return this.projectsService.create(createProjectDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(
    @Query('distributorId') distributorId?: string,
    @Query('clientId') clientId?: string,
    @Query('groupId') groupId?: string,
    @Query('statusId') statusId?: string,
  ) {
    return this.projectsService.findAll({
      distributorId: stringToInt(distributorId),
      clientId: stringToInt(clientId),
      groupId: stringToInt(groupId),
      statusId: stringToInt(statusId),
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.projectsService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateProjectDto: Prisma.ProjectUncheckedUpdateInput,
  ) {
    return this.projectsService.update(+id, updateProjectDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.projectsService.remove(+id);
  }
}
