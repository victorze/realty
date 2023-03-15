import { Entity, Column, OneToMany } from 'typeorm'
import { Model } from './Model'
import { Property } from './Property'

@Entity()
export class User extends Model {
  @Column()
  name: string

  @Column({ unique: true })
  email: string

  @Column()
  password: string

  @Column({ nullable: true })
  token: string

  @Column({ default: false })
  emailVerified: boolean

  @OneToMany(() => Property, (property) => property.owner)
  properties: Property[]
}
