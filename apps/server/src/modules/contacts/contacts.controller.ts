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
  Req,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { JwtAuthGuard } from '~/modules/auth/guards/jwt-auth.guard';
import { stringToInt } from 'src/utils/stringTransform';
import { ContactsService } from './contacts.service';
import { UpdateContactDto } from './dto/update-contact.dto';

@Controller('contacts')
export class ContactsController {
  constructor(private readonly contactsService: ContactsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createContactDto: Prisma.ContactUncheckedCreateInput) {
    return this.contactsService.create(createContactDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(
    @Req() req,
    @Query('clientId') clientId?: string,
    @Query('distributorId') distributorId?: string,
  ) {
    return this.contactsService.findAll({
      distributorId: req?.user?.distributorId || stringToInt(distributorId),
      clientId: stringToInt(clientId),
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.contactsService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateContactDto: UpdateContactDto) {
    return this.contactsService.update(+id, updateContactDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.contactsService.remove(+id);
  }
}
