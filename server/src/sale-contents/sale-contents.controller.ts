import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SaleContentsService } from './sale-contents.service';
import { Prisma } from '@prisma/client';

@Controller('sale-contents')
export class SaleContentsController {
  constructor(private readonly saleContentsService: SaleContentsService) {}

  @Post()
  create(@Body() createSaleContentDto: Prisma.SaleContentUncheckedCreateInput) {
    return this.saleContentsService.create(createSaleContentDto);
  }

  @Get()
  findAll() {
    return this.saleContentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.saleContentsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSaleContentDto: Prisma.SaleContentUncheckedUpdateInput,
  ) {
    return this.saleContentsService.update(+id, updateSaleContentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.saleContentsService.remove(+id);
  }
}
