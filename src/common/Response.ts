import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class Response {
  @Field({ nullable: true })
  error?: string;
}
