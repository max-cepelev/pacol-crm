import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { Prisma } from '@prisma/client';
import { JwtAuthGuard } from '~/modules/auth/guards/jwt-auth.guard';
import { stringToInt } from 'src/utils/stringTransform';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createProductDto: Prisma.ProductUncheckedCreateInput) {
    return this.productsService.create(createProductDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(
    @Query('categoryId') categoryId?: string,
    @Query('subcategoryId') subcategoryId?: string,
  ) {
    return this.productsService.findAll({
      categoryId: stringToInt(categoryId),
      subcategoryId: stringToInt(subcategoryId),
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateProductDto: Prisma.ProductUncheckedUpdateInput,
  ) {
    return this.productsService.update(+id, updateProductDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}
