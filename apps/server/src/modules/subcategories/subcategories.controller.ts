import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { SubcategoriesService } from './subcategories.service';
import { Prisma } from '@prisma/client';
import { stringToInt } from 'src/utils/stringTransform';

@Controller('subcategories')
export class SubcategoriesController {
  constructor(private readonly subcategoriesService: SubcategoriesService) {}

  @Post()
  create(@Body() createSubcategoryDto: Prisma.SubcategoryUncheckedCreateInput) {
    return this.subcategoriesService.create(createSubcategoryDto);
  }

  @Get()
  findAll(@Query('categoryId') categoryId?: string) {
    return this.subcategoriesService.findAll(stringToInt(categoryId));
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.subcategoriesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSubcategoryDto: Prisma.SubcategoryUncheckedUpdateInput,
  ) {
    return this.subcategoriesService.update(+id, updateSubcategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.subcategoriesService.remove(+id);
  }
}
