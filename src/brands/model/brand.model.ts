import {
  Column,
  columnTypes,
  Model,
  Relation,
  relationTypes,
  Table,
} from 'nestjs-objection/dist';
import { Addon } from 'src/addons/model/addon.model';

@Table({ tableName: 'brands' })
export class Brand extends Model {
  @Column({ columnName: 'id', type: columnTypes.increments })
  private readonly id: number;

  @Column({ columnName: 'name', type: columnTypes.string, nullable: false })
  name: string;

  @Relation({
    modelClass: Addon,
    relation: relationTypes.HasManyRelation,
    join: { from: 'brands.id', to: 'addons.brands_id' },
  })
  addons: Addon[];

  @Column({ type: columnTypes.timestamp })
  created_at: string;

  @Column({ type: columnTypes.timestamp })
  updated_at: string;
}
