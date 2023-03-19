import { typeorm } from '../config'

typeorm.dataSource
  .initialize()
  .then(async () => {
    await typeorm.dataSource.query(`
      CREATE TABLE "session" (
        "sid" varchar NOT NULL COLLATE "default",
        "sess" json NOT NULL,
        "expire" timestamp(6) NOT NULL
      )
      WITH (OIDS=FALSE);

      ALTER TABLE "session" ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;

      CREATE INDEX "IDX_session_expire" ON "session" ("expire");
    `)

    process.exit()
  })
  .catch((error) => {
    console.log(error)
    process.exit(1)
  })
