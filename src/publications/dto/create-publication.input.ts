import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsUUID, MaxLength } from 'class-validator';

@InputType()
export class CreatePublicationInput {
  @Field()
  @IsNotEmpty({ message: 'El título es requerido' })
  @MaxLength(255)
  title: string;

  @Field()
  @IsNotEmpty({ message: 'El contenido es requerido' })
  content: string;

  @Field()
  @IsNotEmpty({ message: 'El autor es requerido' })
  @IsUUID()
  authorId: string;
}
