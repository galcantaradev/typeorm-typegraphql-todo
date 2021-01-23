import { Field, ID, InputType } from 'type-graphql';

@InputType()
export class IngredientInput {
  @Field(type => ID, { nullable: true })
  id?: string;

  @Field()
  name: string;
}
