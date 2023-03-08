import { DataSource } from 'typeorm'
import { env } from '.'

export const dataSource = new DataSource({
  type: env.DB_CONNECTION as 'postgres',
  host: env.DB_HOST,
  port: Number(env.DB_PORT),
  username: env.DB_USERNAME,
  password: env.DB_PASSWORD,
  database: env.DB_DATABASE,

  entities: [
    env.NODE_ENV === 'production' ? 'build/models/*.js' : 'models/*.ts',
  ],
  logging: true,
  synchronize: true,
})
