import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Author } from '../../authors/entities/author.entity';

@ObjectType()
@Entity('publications')
export class Publication {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column({ length: 255 })
  title: string;

  @Field()
  @Column('text')
  content: string;

  @Field()
  @Column({ name: 'author_id' })
  authorId: string;

  @Field(() => Author)
  @ManyToOne(() => Author, (author) => author.publications, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'author_id' })
  author: Author;

  @Field()
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
