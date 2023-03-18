import { DataSource } from 'typeorm'
import { env } from './index'

const dataSource = new DataSource({
  type: env.DB_CONNECTION as 'postgres' | 'mysql' | 'mongodb',
  host: env.DB_HOST,
  port: Number(env.DB_PORT),
  username: env.DB_USERNAME,
  password: env.DB_PASSWORD,
  database: env.DB_DATABASE,

  entities: [
    env.NODE_ENV === 'production' ? 'build/models/*.js' : 'models/*.ts',
  ],
  logging: env.NODE_ENV === 'development',
  synchronize: env.NODE_ENV !== 'production',
})

export const connect = () => {
  dataSource
    .initialize()
    .then(() => {
      console.log('Data Source has been initialized!')
    })
    .catch((err) => {
      console.error('Error during Data Source initialization:', err)
    })
}
