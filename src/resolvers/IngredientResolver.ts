import {
  Arg,
  Field,
  Mutation,
  ObjectType,
  Query,
  Resolver
} from 'type-graphql';

import { Response } from '../common';
import { Ingredient, Recipe } from '../entities';
import { IngredientInput } from '../inputs';

@ObjectType()
class IngredientResponse extends Response {
  @Field({ nullable: true })
  ingredient?: Ingredient;
}

@Resolver()
export class IngredientResolver {
  @Query(returns => [Ingredient])
  async ingredients(): Promise<Ingredient[]> {
    const ingredients = await Ingredient.find();

    return ingredients;
  }

  @Query(returns => [Ingredient])
  async ingredientById(@Arg('id') id: string): Promise<IngredientResponse> {
    const ingredient = await Ingredient.findOne(id);

    if (!ingredient) {
      return { error: 'ingredient not found' };
    }

    return { ingredient };
  }

  @Mutation(returns => IngredientResponse)
  async addIngredient(
    @Arg('id') recipeId: string,
    @Arg('ingredient') options: IngredientInput
  ): Promise<IngredientResponse> {
    const recipe = await Recipe.findOne(recipeId);

    if (!recipe) {
      return { error: 'recipe not found' };
    }

    const ingredient = await Ingredient.create({
      recipe,
      name: options.name
    }).save();

    return { ingredient };
  }

  @Mutation(returns => Boolean)
  async deleteIngredient(@Arg('id') id: string): Promise<boolean> {
    const ingredient = await Ingredient.findOne(id);

    if (ingredient) {
      await ingredient.remove();

      return true;
    }

    return false;
  }
}
