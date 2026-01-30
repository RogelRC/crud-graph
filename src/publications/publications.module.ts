import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PublicationsService } from './publications.service';
import { PublicationsResolver } from './publications.resolver';
import { Publication } from './entities/publication.entity';
import { AuthorsModule } from '../authors/authors.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Publication]),
    AuthorsModule,
  ],
  providers: [PublicationsService, PublicationsResolver],
  exports: [PublicationsService],
})
export class PublicationsModule {}
