import { Column, Entity } from 'typeorm';
import { Model } from './Model';

@Entity()
export class Category extends Model {
  @Column({ length: 30 })
  name: string;
}
