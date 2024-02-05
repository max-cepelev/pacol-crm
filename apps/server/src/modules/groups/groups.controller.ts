import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  Query,
} from '@nestjs/common';
import { GroupsService } from './groups.service';
import { Prisma } from '@prisma/client';
import { JwtAuthGuard } from '~/modules/auth/guards/jwt-auth.guard';
import { stringToInt } from '~/utils/stringTransform';
import type { FastifyRequest } from 'fastify';
import { User } from '../users/entities/user.entity';

@Controller('groups')
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createGroupDto: Prisma.GroupUncheckedCreateInput) {
    return this.groupsService.create(createGroupDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(
    @Req() req: FastifyRequest & { user: User },
    @Query('distributorId') distributorId?: string,
  ) {
    return this.groupsService.findAll(
      req?.user?.distributorId || stringToInt(distributorId),
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.groupsService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateGroupDto: Prisma.GroupUncheckedUpdateInput,
  ) {
    return this.groupsService.update(+id, updateGroupDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.groupsService.remove(+id);
  }
}
