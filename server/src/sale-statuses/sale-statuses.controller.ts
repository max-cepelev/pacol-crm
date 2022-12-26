import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SaleStatusesService } from './sale-statuses.service';
import { Prisma } from '@prisma/client';

@Controller('sale-statuses')
export class SaleStatusesController {
  constructor(private readonly saleStatusesService: SaleStatusesService) {}

  @Post()
  create(@Body() createSaleStatusDto: Prisma.SaleStatusUncheckedCreateInput) {
    return this.saleStatusesService.create(createSaleStatusDto);
  }

  @Get()
  findAll() {
    return this.saleStatusesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.saleStatusesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSaleStatusDto: Prisma.SaleStatusUncheckedUpdateInput,
  ) {
    return this.saleStatusesService.update(+id, updateSaleStatusDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.saleStatusesService.remove(+id);
  }
}
