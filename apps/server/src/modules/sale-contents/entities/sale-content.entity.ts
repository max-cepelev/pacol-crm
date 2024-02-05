import { Product } from '~/modules/products/entities/product.entity';
import { Sale } from '~/modules/sales/entities/sale.entity';

export class SaleContent {
  id: number;
  price: number;
  amount: number;
  saleId: number;
  sale?: Sale;
  productId: number;
  product?: Product;
}
