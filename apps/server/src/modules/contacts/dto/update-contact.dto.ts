export class UpdateContactDto {
  name?: string;
  email?: string;
  phone?: string;
  description?: string;
  clientId?: number;
  distributorId?: number;
  constructor(model: UpdateContactDto) {
    Object.entries(model).forEach(([key, value]) => {
      if (value && key in UpdateContactDto) this[key] = value;
    });
  }
}
