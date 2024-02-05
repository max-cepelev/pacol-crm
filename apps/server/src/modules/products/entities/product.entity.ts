import { Category } from '~/modules/categories/entities/category.entity';
import { Characteristic } from '~/modules/characteristics/entities/characteristic.entity';
import { Property } from '~/modules/properties/entities/property.entity';
import { SaleContent } from '~/modules/sale-contents/entities/sale-content.entity';
import { Subcategory } from '~/modules/subcategories/entities/subcategory.entity';

export class Product {
  id: number;
  name: string;
  description: string | null;
  price: number;
  images: string[];
  video: string | null;
  instruction: string | null;
  properties?: Property[];
  saleContents?: SaleContent[];
  characteristics?: Characteristic[];
  categoryId: number;
  category?: Category;
  subcategoryId: number | null;
  subcategory?: Subcategory | null;
}
