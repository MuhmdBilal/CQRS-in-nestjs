import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { typeormOptions } from "./data-source";

export const ormConfig: TypeOrmModuleOptions = typeormOptions;