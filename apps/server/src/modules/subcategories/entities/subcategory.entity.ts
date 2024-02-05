import { Category } from '~/modules/categories/entities/category.entity';
import { Product } from '~/modules/products/entities/product.entity';

export class Subcategory {
  id: number;
  name: string;
  categoryId: number;
  category?: Category;
  products?: Product[];
}
