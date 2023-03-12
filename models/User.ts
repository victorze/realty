import crypto from 'crypto'
import { Entity, Column } from 'typeorm'
import { Model } from './Model'

@Entity()
export class User extends Model {
  @Column()
  name: string

  @Column({ unique: true })
  email: string

  @Column()
  private password: string

  @Column()
  salt: string

  @Column({ nullable: true })
  token: string

  @Column({ default: false })
  emailVerified: boolean

  setPassword(password: string) {
    this.salt = crypto.randomBytes(16).toString('hex')
    this.password = crypto
      .pbkdf2Sync(password, this.salt, 1000, 64, 'sha512')
      .toString('hex')
  }

  checkPassword(password: string): boolean {
    const hash = crypto
      .pbkdf2Sync(password, this.salt, 1000, 64, 'sha512')
      .toString('hex')
    return this.password === hash
  }
}
