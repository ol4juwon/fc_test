export interface queryType {
  id: number;
  query: {
    limit?: number;
    page?: number;
    sortBy?: string;
    order: 'DESC' | 'ASC';
  };
  addonId?: number;
}
