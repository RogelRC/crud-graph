import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { PublicationsService } from './publications.service';
import { Publication } from './entities/publication.entity';
import { CreatePublicationInput } from './dto/create-publication.input';
import { UpdatePublicationInput } from './dto/update-publication.input';

@Resolver(() => Publication)
export class PublicationsResolver {
  constructor(private readonly publicationsService: PublicationsService) {}

  @Mutation(() => Publication, { name: 'createPublication' })
  create(@Args('input') input: CreatePublicationInput) {
    return this.publicationsService.create(input);
  }

  @Query(() => [Publication], { name: 'publications' })
  findAll() {
    return this.publicationsService.findAll();
  }

  @Query(() => Publication, { name: 'publication', nullable: true })
  findOne(@Args('id', { type: () => ID }) id: string) {
    return this.publicationsService.findOne(id);
  }

  @Mutation(() => Publication, { name: 'updatePublication' })
  update(
    @Args('id', { type: () => ID }) id: string,
    @Args('input') input: UpdatePublicationInput,
  ) {
    return this.publicationsService.update(id, input);
  }

  @Mutation(() => Publication, { name: 'removePublication' })
  remove(@Args('id', { type: () => ID }) id: string) {
    return this.publicationsService.remove(id);
  }
}
