import { Column, Entity, ManyToOne } from 'typeorm'
import { Category } from './Category'
import { Model } from './Model'
import { Price } from './Price'
import { User } from './User'

@Entity()
export class Property extends Model {
  @Column({ length: 100 })
  title: string

  @Column('text')
  description: string

  @Column()
  roomCount: number

  @Column('integer')
  parkingCount: number

  @Column('integer')
  wcCount: number

  @Column({ length: 60 })
  street: string

  @Column()
  lat: string

  @Column()
  lng: string

  @Column()
  image: string

  @Column({ default: false })
  published: boolean

  @ManyToOne(() => User, (user) => user.properties)
  owner: User

  @ManyToOne(() => Category)
  category: Category

  @ManyToOne(() => Price)
  price: Price
}
