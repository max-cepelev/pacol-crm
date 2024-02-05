import { Product } from '~/modules/products/entities/product.entity';

export class Characteristic {
  id: number;
  name: string;
  unit: string | null;
  value: string;
  productId: number;
  product?: Product;
}
