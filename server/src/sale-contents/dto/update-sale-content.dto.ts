import { PartialType } from '@nestjs/mapped-types';
import { CreateSaleContentDto } from './create-sale-content.dto';

export class UpdateSaleContentDto extends PartialType(CreateSaleContentDto) {}
