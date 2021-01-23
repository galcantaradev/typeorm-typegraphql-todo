import { Field, ID, InputType } from 'type-graphql';

import { IngredientInput } from './IngredientInputs';

@InputType()
export class RecipeInput {
  @Field(type => ID, { nullable: true })
  id?: string;

  @Field()
  title: string;

  @Field({ nullable: true })
  description?: string;

  @Field(type => [IngredientInput], { nullable: true })
  ingredients?: IngredientInput[];
}
