import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { AuthorsService } from './authors.service';
import { Author } from './entities/author.entity';
import { CreateAuthorInput } from './dto/create-author.input';
import { UpdateAuthorInput } from './dto/update-author.input';

@Resolver(() => Author)
export class AuthorsResolver {
  constructor(private readonly authorsService: AuthorsService) {}

  @Mutation(() => Author, { name: 'createAuthor' })
  create(@Args('input') input: CreateAuthorInput) {
    return this.authorsService.create(input);
  }

  @Query(() => [Author], { name: 'authors' })
  findAll() {
    return this.authorsService.findAll();
  }

  @Query(() => Author, { name: 'author', nullable: true })
  findOne(@Args('id', { type: () => ID }) id: string) {
    return this.authorsService.findOne(id);
  }

  @Mutation(() => Author, { name: 'updateAuthor' })
  update(
    @Args('id', { type: () => ID }) id: string,
    @Args('input') input: UpdateAuthorInput,
  ) {
    return this.authorsService.update(id, input);
  }

  @Mutation(() => Author, { name: 'removeAuthor' })
  remove(@Args('id', { type: () => ID }) id: string) {
    return this.authorsService.remove(id);
  }
}
