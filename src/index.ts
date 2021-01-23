import 'reflect-metadata';

import { ApolloServer } from 'apollo-server';
import { createConnection } from 'typeorm';
import { buildSchema } from 'type-graphql';

import { PORT } from './constants';
import { RecipeResolver, IngredientResolver } from './resolvers';
import typeormConfig from '../typeorm.config';

const main = async () => {
  await createConnection(typeormConfig);

  const schema = await buildSchema({
    resolvers: [RecipeResolver, IngredientResolver]
  });

  const server = new ApolloServer({
    schema,
    playground: true
  });

  server.listen(PORT, () => console.log(`Server running on localhost:${PORT}`));
};

main().catch(error => console.error(error));
