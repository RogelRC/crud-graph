import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Author } from './entities/author.entity';
import { CreateAuthorInput } from './dto/create-author.input';
import { UpdateAuthorInput } from './dto/update-author.input';

@Injectable()
export class AuthorsService {
  constructor(
    @InjectRepository(Author)
    private readonly authorRepository: Repository<Author>,
  ) {}

  async create(createAuthorInput: CreateAuthorInput): Promise<Author> {
    const existing = await this.authorRepository.findOne({
      where: { email: createAuthorInput.email },
    });
    if (existing) {
      throw new ConflictException(
        `Ya existe un autor con el email ${createAuthorInput.email}`,
      );
    }
    const author = this.authorRepository.create(createAuthorInput);
    return this.authorRepository.save(author);
  }

  async findAll(): Promise<Author[]> {
    return this.authorRepository.find({
      order: { createdAt: 'DESC' },
      relations: ['publications'],
    });
  }

  async findOne(id: string): Promise<Author> {
    const author = await this.authorRepository.findOne({
      where: { id },
      relations: ['publications'],
    });
    if (!author) {
      throw new NotFoundException(`Autor con id "${id}" no encontrado`);
    }
    return author;
  }

  async update(id: string, updateAuthorInput: UpdateAuthorInput): Promise<Author> {
    const author = await this.findOne(id);
    if (updateAuthorInput.email && updateAuthorInput.email !== author.email) {
      const existing = await this.authorRepository.findOne({
        where: { email: updateAuthorInput.email },
      });
      if (existing) {
        throw new ConflictException(
          `Ya existe un autor con el email ${updateAuthorInput.email}`,
        );
      }
    }
    Object.assign(author, updateAuthorInput);
    return this.authorRepository.save(author);
  }

  async remove(id: string): Promise<Author> {
    const author = await this.findOne(id);
    await this.authorRepository.remove(author);
    return { ...author, id };
  }
}
