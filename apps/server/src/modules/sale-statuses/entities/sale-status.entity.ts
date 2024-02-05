import { Sale } from '~/modules/sales/entities/sale.entity';

export class SaleStatus {
  id: number;
  name: string;
  sales?: Sale[];
}
