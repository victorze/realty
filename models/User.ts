import { Entity, Column } from 'typeorm'
import { Model } from './Model'

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
}
