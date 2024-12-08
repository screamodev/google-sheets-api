import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Row } from './entities/row.entity';

@Injectable()
export class RowsService {
  constructor(
    @InjectRepository(Row)
    private readonly rowRepository: Repository<Row>,
  ) {}

  async createRow(content: string): Promise<Row> {
    const newRow = this.rowRepository.create({ content });
    return this.rowRepository.save(newRow);
  }

  async getAllRows(): Promise<Row[]> {
    return this.rowRepository.find();
  }

  async getRowById(id: number): Promise<Row> {
    return this.rowRepository.findOneOrFail({ where: { id } });
  }
}
