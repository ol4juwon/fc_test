import {
  Column,
  columnTypes,
  Model,
  Relation,
  relationTypes,
  Table,
} from 'nestjs-objection/dist';
import { Category } from 'src/category/model/category.model';

@Table({ tableName: 'addons' })
export class Addon extends Model {
  @Column({ columnName: 'id', type: columnTypes.increments, primary: true })
  private readonly id: number;

  @Column({
    columnName: 'name',
    type: columnTypes.string,
    nullable: false,
    length: 40,
    unique: true,
  })
  name: string;

  @Column({ columnName: 'description', type: columnTypes.text, nullable: true })
  description: string;

  @Column({
    columnName: 'price',
    nullable: false,
    type: columnTypes.integer,
    unsigned: false,
  })
  price: number;

  @Column({ columnName: 'brands_id', type: columnTypes.integer })
  brands_id: number;

  @Column({
    columnName: 'category',
    type: columnTypes.string,
    nullable: true,
    length: 40,
  })
  category: string;

  @Column({ type: columnTypes.timestamp })
  created_at: string;

  @Column({ type: columnTypes.timestamp })
  updated_at: string;

  async $beforeUpdate(opt, queryContext) {
    this.updated_at = new Date().toISOString();
  }
}
