export class CreateProductDto {
  name: string;
  description?: string;
  price: number;
  images: string[];
  video?: string;
  instruction?: string;
}
