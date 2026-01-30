import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsOptional, MaxLength } from 'class-validator';

@InputType()
export class UpdateAuthorInput {
  @Field({ nullable: true })
  @IsOptional()
  @MaxLength(255)
  name?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsEmail()
  @MaxLength(255)
  email?: string;
}
