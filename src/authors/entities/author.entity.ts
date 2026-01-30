import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Publication } from '../../publications/entities/publication.entity';

@ObjectType()
@Entity('authors')
export class Author {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column({ length: 255 })
  name: string;

  @Field()
  @Column({ length: 255, unique: true })
  email: string;

  @Field()
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @Field(() => [Publication], { nullable: true })
  @OneToMany(() => Publication, (publication) => publication.author)
  publications?: Publication[];
}
