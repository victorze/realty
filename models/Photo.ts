import { Column, Entity, ManyToOne } from 'typeorm';
import { Model } from './Model';
import { Property } from './Property';

@Entity()
export class Photo extends Model {
  @Column({ length: 30 })
  publicId: string;

  @Column()
  url: string;

  @ManyToOne(() => Property)
  property: Property;
}
