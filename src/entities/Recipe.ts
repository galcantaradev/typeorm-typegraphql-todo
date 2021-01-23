import { Field, ID, ObjectType } from 'type-graphql';
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm';
import { Ingredient } from './Ingredient';

@Entity()
@ObjectType({ description: 'The recipe model' })
export class Recipe extends BaseEntity {
  @Field(type => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text', nullable: false })
  @Field({ description: 'The title of the recipe' })
  title: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  description?: string;

  @OneToMany(() => Ingredient, ingredient => ingredient.recipe, {
    eager: true
  })
  @Field(type => [Ingredient], { nullable: true })
  ingredients: Ingredient[];
}
