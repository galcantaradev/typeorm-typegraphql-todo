import { Field, ID, ObjectType } from 'type-graphql';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn
} from 'typeorm';
import { Recipe } from './Recipe';

@Entity()
@ObjectType({ description: 'The ingredient model' })
export class Ingredient extends BaseEntity {
  @Field(type => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field({ description: 'The name of the ingredient' })
  @Column({ type: 'text' })
  name: string;

  @Field(type => Recipe)
  @ManyToOne(() => Recipe, recipe => recipe.ingredients, {
    lazy: true,
    onDelete: 'CASCADE'
  })
  recipe: Recipe;
}
