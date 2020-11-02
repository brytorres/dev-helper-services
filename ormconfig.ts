module.exports = {
  type: process.env.TYPEORM_CONNECTION,
  host: process.env.TYPEORM_HOST,
  port: process.env.TYPEORM_PORT,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
  entities: process.env.TYPEORM_ENTITIES.split(','),
  migrationsRun: process.env.TYPEORM_MIGRATIONS_RUN,
  migrations: process.env.TYPEORM_MIGRATIONS.split(','),
  cli: {
    migrationsDir: process.env.TYPEORM_MIGRATIONS_DIR.split(','),
  },
  synchronize: process.env.TYPEORM_SYNCHRONIZE,
};