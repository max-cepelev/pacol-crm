import { Product } from '~/modules/products/entities/product.entity';
import { Subcategory } from '~/modules/subcategories/entities/subcategory.entity';

export class Category {
  id: number;
  name: string;
  subcategories?: Subcategory[];
  products?: Product[];
}
