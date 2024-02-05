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
import { SaleStatusesService } from './sale-statuses.service';
import { Prisma } from '@prisma/client';
import { JwtAuthGuard } from '~/modules/auth/guards/jwt-auth.guard';

@Controller('sale-statuses')
export class SaleStatusesController {
  constructor(private readonly saleStatusesService: SaleStatusesService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createSaleStatusDto: Prisma.SaleStatusUncheckedCreateInput) {
    return this.saleStatusesService.create(createSaleStatusDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.saleStatusesService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.saleStatusesService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSaleStatusDto: Prisma.SaleStatusUncheckedUpdateInput,
  ) {
    return this.saleStatusesService.update(+id, updateSaleStatusDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.saleStatusesService.remove(+id);
  }
}
