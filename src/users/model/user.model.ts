import { Column, columnTypes, Model, Table } from 'nestjs-objection/dist';

@Table({ tableName: 'users' })
export class User extends Model {
  @Column({ columnName: 'id', type: columnTypes.increments })
  private readonly id: number;
  @Column({ columnName: 'username', type: columnTypes.string, unique: true })
  username: string;

  @Column({
    columnName: 'password',
    type: columnTypes.string,
    notNullable: true,
  })
  password: string;

  @Column({
    columnName: 'isActive',
    type: columnTypes.boolean,
    notNullable: true,
    default: true,
  })
  isActive: boolean;

  @Column({ columnName: 'roles', type: columnTypes.string, notNullable: true })
  roles: string[];
  @Column({ type: columnTypes.timestamp })
  created_at: string;

  @Column({ type: columnTypes.timestamp })
  updated_at: string;

  async $beforeUpdate(opt, queryContext) {
    this.updated_at = new Date().toISOString();
  }
}
