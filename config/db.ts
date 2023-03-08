import { DataSource } from 'typeorm'
import { env } from '.'

export const dataSource = new DataSource({
  type: parseConnection(env.DB_CONNECTION),
  host: env.DB_HOST,
  port: Number(env.DB_PORT),
  username: env.DB_USERNAME,
  password: env.DB_PASSWORD,
  database: env.DB_DATABASE,

  entities: ["models/*.ts"],
  logging: true,
  synchronize: true,
})

function parseConnection(connection: any) {
  const databases = [
    'mysql',
    'mariadb',
    'postgres',
    'sqlite',
    'mongodb',
    'oracle',
  ]
  if (databases.includes(connection)) {
    return connection
  }
  return 'postgres'
}
