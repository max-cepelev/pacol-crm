import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { CharacteristicsService } from './characteristics.service';

@Controller('characteristics')
export class CharacteristicsController {
  constructor(
    private readonly characteristicsService: CharacteristicsService,
  ) {}

  @Post()
  create(@Body() createCategoryDto: Prisma.CharacteristicUncheckedCreateInput) {
    return this.characteristicsService.create(createCategoryDto);
  }

  @Get()
  findAll() {
    return this.characteristicsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.characteristicsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: Prisma.CharacteristicUncheckedUpdateInput,
  ) {
    return this.characteristicsService.update(+id, updateCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.characteristicsService.remove(+id);
  }
}
