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
import { SalesService } from './sales.service';
import { Prisma } from '@prisma/client';
import { JwtAuthGuard } from '~/modules/auth/guards/jwt-auth.guard';

@Controller('sales')
export class SalesController {
  constructor(private readonly salesService: SalesService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createSaleDto: Prisma.SaleUncheckedCreateInput) {
    return this.salesService.create(createSaleDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.salesService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.salesService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSaleDto: Prisma.SaleUncheckedUpdateInput,
  ) {
    return this.salesService.update(+id, updateSaleDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.salesService.remove(+id);
  }
}
