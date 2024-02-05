import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { JwtAuthGuard } from '~/modules/auth/guards/jwt-auth.guard';
import { stringToInt } from 'src/utils/stringTransform';
import { ClientsService } from './clients.service';
import { UpdateClientDto } from './dto/update-client.dto';

@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createClientDto: Prisma.ClientUncheckedCreateInput) {
    return this.clientsService.create(createClientDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(
    @Query('groupId') groupId: string,
    @Query('distributorId') distributorId: string,
  ) {
    return this.clientsService.findAll({
      distributorId: stringToInt(distributorId),
      groupId: stringToInt(groupId),
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clientsService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateClientDto: UpdateClientDto) {
    return this.clientsService.update(+id, updateClientDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clientsService.remove(+id);
  }
}
