export interface queryType {
  id: number;
  query: {
    limit?: number;
    page?: number;
    sortBy?: string;
    order: 'DESC' | 'ASC';
  };
}
export type updateAddon = {
  brands_id: number;
  addonId: number;
  payload: {
    name?: string;
    price?: number;
    description?: string;
    category?: string[];
  };
};

export type Addon = {
  name: string;
  price: number;
  description?: string;
  category?: string[];
};
export type RemoveAddon = {
  brandId: number;
  addonId: number;
};
