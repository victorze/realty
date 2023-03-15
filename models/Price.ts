import { Column, Entity } from 'typeorm'
import { Model } from './Model'

@Entity()
export class Price extends Model {
  @Column({ length: 30 })
  range: string
}
