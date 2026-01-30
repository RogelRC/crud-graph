import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, MaxLength } from 'class-validator';

@InputType()
export class CreateAuthorInput {
  @Field()
  @IsNotEmpty({ message: 'El nombre es requerido' })
  @MaxLength(255)
  name: string;

  @Field()
  @IsNotEmpty({ message: 'El email es requerido' })
  @IsEmail()
  @MaxLength(255)
  email: string;
}
