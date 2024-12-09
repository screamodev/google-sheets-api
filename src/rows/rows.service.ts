import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Row } from './entities/row.entity';
import { EmailService } from '../email/email.service';

@Injectable()
export class RowsService {
  private recordedRowsCount = 0;

  constructor(
    @InjectRepository(Row)
    private readonly rowRepository: Repository<Row>,
    private readonly emailService: EmailService,
  ) {}

  async createRow(content: string): Promise<Row> {
    const newRow = this.rowRepository.create({ content });
    const savedRow = await this.rowRepository.save(newRow);

    this.recordedRowsCount++;

    if (this.recordedRowsCount % 10 === 0) {
      await this.sendNotificationEmails();
    }

    return savedRow;
  }

  private async sendNotificationEmails(): Promise<void> {
    const emails = await this.getEmailsFromGoogleSheet();

    const subject = 'Added 10 new lines';
    const text = `Added ${this.recordedRowsCount} lines in database.`;

    try {
      await this.emailService.sendEmail(emails, subject, text);
      console.log('Emails has sent.');
    } catch (error) {
      console.error('Error during sending email:', error.message);
    }
  }

  private async getEmailsFromGoogleSheet(): Promise<string[]> {
    return ['arsenii.iurchenko@gmail.com'];
  }

  async getAllRows(): Promise<Row[]> {
    return this.rowRepository.find();
  }

  async getRowById(id: number): Promise<Row> {
    return this.rowRepository.findOneOrFail({ where: { id } });
  }
}
