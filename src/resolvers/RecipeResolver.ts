import {
  Arg,
  Field,
  Mutation,
  ObjectType,
  Query,
  Resolver
} from 'type-graphql';

import { Response } from '../common';
import { RecipeInput } from '..//inputs';
import { Recipe } from '../entities';

@ObjectType()
class RecipeResponse extends Response {
  @Field({ nullable: true })
  recipe?: Recipe;
}

@Resolver()
export class RecipeResolver {
  @Query(returns => [Recipe])
  async recipes(): Promise<Recipe[]> {
    return Recipe.find();
  }

  @Query(returns => RecipeResponse, { nullable: true })
  async recipeById(@Arg('id') id: string): Promise<RecipeResponse> {
    const recipe = await Recipe.findOne(id);

    if (!recipe) {
      return { error: 'recipe not found' };
    }

    return { recipe };
  }

  @Mutation(returns => RecipeResponse, { nullable: true })
  async saveRecipe(
    @Arg('recipe') options: RecipeInput
  ): Promise<RecipeResponse> {
    const recipe = await Recipe.create({
      title: options.title,
      description: options.description,
      ingredients: options.ingredients
    }).save();

    return { recipe };
  }

  @Mutation(returns => RecipeResponse, { nullable: true })
  async updateRecipe(
    @Arg('recipe') options: RecipeInput
  ): Promise<RecipeResponse> {
    const recipe = await Recipe.findOne(options.id);

    if (!recipe) {
      return { error: 'recipe not found' };
    }

    recipe.title = options.title;
    recipe.description = options.description;

    await recipe.save();

    return { recipe };
  }

  @Mutation(returns => Boolean)
  async deleteRecipe(@Arg('id') id: string): Promise<boolean> {
    const recipe = await Recipe.findOne(id);

    if (!recipe) {
      return false;
    }

    await recipe.remove();

    return true;
  }
}
