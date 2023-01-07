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

  @Relation({
    modelClass: Category,
    relation: relationTypes.HasManyRelation,
    join: { from: 'addons.id', to: 'category.addons_id' },
  })
  category: Category[];

  @Column({ type: columnTypes.timestamp })
  created_at: string;

  @Column({ type: columnTypes.timestamp })
  updated_at: string;
}
