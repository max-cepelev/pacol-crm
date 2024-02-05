import { Product } from '~/modules/products/entities/product.entity';

export class Property {
  id: number;
  img: string | null;
  content: string;
  productId: number;
  product?: Product;
}
