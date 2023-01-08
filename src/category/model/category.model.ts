import { Column, columnTypes, Model, Table } from 'nestjs-objection/dist';

@Table({ tableName: 'category' })
export class Category extends Model {
  @Column({ columnName: 'id', type: columnTypes.increments })
  private readonly id: number;
  @Column({ columnName: 'addons_id', type: columnTypes.integer })
  addons_id: number;

  @Column({ columnName: 'name', type: columnTypes.string })
  name: string;

  @Column({ columnName: 'brands_id', type: columnTypes.integer })
  brands_id: number;

  @Column({ type: columnTypes.timestamp })
  created_at: string;

  @Column({ type: columnTypes.timestamp })
  updated_at: string;
  async $beforeUpdate(opt, queryContext) {
    this.updated_at = new Date().toISOString();
  }
}
