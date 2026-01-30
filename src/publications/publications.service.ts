import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Publication } from './entities/publication.entity';
import { CreatePublicationInput } from './dto/create-publication.input';
import { UpdatePublicationInput } from './dto/update-publication.input';
import { AuthorsService } from '../authors/authors.service';

@Injectable()
export class PublicationsService {
  constructor(
    @InjectRepository(Publication)
    private readonly publicationRepository: Repository<Publication>,
    private readonly authorsService: AuthorsService,
  ) {}

  async create(
    createPublicationInput: CreatePublicationInput,
  ): Promise<Publication> {
    await this.authorsService.findOne(createPublicationInput.authorId);
    const publication =
      this.publicationRepository.create(createPublicationInput);
    return this.publicationRepository.save(publication);
  }

  async findAll(): Promise<Publication[]> {
    return this.publicationRepository.find({
      order: { createdAt: 'DESC' },
      relations: ['author'],
    });
  }

  async findOne(id: string): Promise<Publication> {
    const publication = await this.publicationRepository.findOne({
      where: { id },
      relations: ['author'],
    });
    if (!publication) {
      throw new NotFoundException(`Publicación con id "${id}" no encontrada`);
    }
    return publication;
  }

  async update(
    id: string,
    updatePublicationInput: UpdatePublicationInput,
  ): Promise<Publication> {
    const publication = await this.findOne(id);
    if (updatePublicationInput.authorId) {
      await this.authorsService.findOne(updatePublicationInput.authorId);
    }
    Object.assign(publication, updatePublicationInput);
    return this.publicationRepository.save(publication);
  }

  async remove(id: string): Promise<Publication> {
    const publication = await this.findOne(id);
    await this.publicationRepository.remove(publication);
    return { ...publication, id };
  }
}
