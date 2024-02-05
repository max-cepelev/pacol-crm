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
import { SaleContentsService } from './sale-contents.service';
import { Prisma } from '@prisma/client';
import { JwtAuthGuard } from '~/modules/auth/guards/jwt-auth.guard';

@Controller('sale-contents')
export class SaleContentsController {
  constructor(private readonly saleContentsService: SaleContentsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createSaleContentDto: Prisma.SaleContentUncheckedCreateInput) {
    return this.saleContentsService.create(createSaleContentDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.saleContentsService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.saleContentsService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSaleContentDto: Prisma.SaleContentUncheckedUpdateInput,
  ) {
    return this.saleContentsService.update(+id, updateSaleContentDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.saleContentsService.remove(+id);
  }
}
