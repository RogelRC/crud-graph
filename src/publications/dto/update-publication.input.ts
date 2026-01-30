import { InputType, Field } from '@nestjs/graphql';
import { IsOptional, IsUUID, MaxLength } from 'class-validator';

@InputType()
export class UpdatePublicationInput {
  @Field({ nullable: true })
  @IsOptional()
  @MaxLength(255)
  title?: string;

  @Field({ nullable: true })
  @IsOptional()
  content?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsUUID()
  authorId?: string;
}
