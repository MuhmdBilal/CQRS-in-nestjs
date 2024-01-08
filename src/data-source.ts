import * as dotenv from "dotenv";
import { join } from "path";
import { DataSource, DataSourceOptions } from "typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";



dotenv.config();

export const dataSourceOptions: DataSourceOptions = {
    type: "postgres",
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    logging: true,
    synchronize: false,
    entities: [join(__dirname, "/**/*.entity.{ts,js}")],
    migrations: [join(__dirname, "/database/migrations/**/*.{ts,js}")],
    namingStrategy: new SnakeNamingStrategy(),
}


const cliConfigOptions = {
    cli: {
      migrationsDir: `src/database/migrations`,
    },
  };


  export const typeormOptions = {
    ...dataSourceOptions,
    ...cliConfigOptions,
  };
  
  export const AppDataSource = new DataSource(dataSourceOptions);