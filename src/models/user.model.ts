import type { Optional } from 'sequelize';
import { Table, Model,Column,PrimaryKey, DataType, AutoIncrement, Unique } from 'sequelize-typescript';

interface UserAttributes {
  id: number;
  firstName: string;
  lastName:string,
  email:string

}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface UserCreationAttributes extends Optional<UserAttributes, 'id'|'lastName'> {}

@Table
export class User extends Model<UserAttributes, UserCreationAttributes> {

  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  declare id: number;

  @Column(DataType.STRING)
  declare firstName: string;

  @Column(DataType.STRING)
  declare lastName: string;

  @Unique
  @Column(DataType.STRING)
  declare email: string;

}
