import { ConnectionOptions } from 'typeorm';

import { Ingredient, Recipe } from './src/entities';

export default {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'test',
  synchronize: true,
  logging: false,
  entities: [Recipe, Ingredient]
} as ConnectionOptions;
