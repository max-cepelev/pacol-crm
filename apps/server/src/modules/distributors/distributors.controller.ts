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
import { Prisma } from '@prisma/client';
import { JwtAuthGuard } from '~/modules/auth/guards/jwt-auth.guard';
import { DistributorsService } from './distributors.service';

@Controller('distributors')
export class DistributorsController {
  constructor(private readonly distributorsService: DistributorsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createDistributorDto: Prisma.DistributorUncheckedCreateInput) {
    return this.distributorsService.create(createDistributorDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.distributorsService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.distributorsService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDistributorDto: Prisma.DistributorUncheckedUpdateInput,
  ) {
    return this.distributorsService.update(+id, updateDistributorDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.distributorsService.remove(+id);
  }
}
