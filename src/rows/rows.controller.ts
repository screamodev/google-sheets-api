import { Controller, Post, Body, Get, Param, Logger } from '@nestjs/common';
import { RowsService } from './rows.service';
import { NotificationGateway } from '../notifications/notification.gateway';

@Controller('rows')
export class RowsController {
  private readonly logger = new Logger(RowsController.name);
  constructor(
    private readonly rowService: RowsService,
    private readonly notificationGateway: NotificationGateway,
  ) {}

  @Post('webhook')
  async handleWebhook(@Body() data: any) {
    this.logger.log('Received webhook:', data);

    console.log('all data', data);

    const { sheetName, range, values } = data;

    const content = JSON.stringify({ sheetName, range, values });
    const row = await this.rowService.createRow(content);

    this.notificationGateway.emitNewRow(row);

    return row;
  }

  @Get()
  async getAllRows() {
    return this.rowService.getAllRows();
  }

  @Get(':id')
  async getRowById(@Param('id') id: number) {
    return this.rowService.getRowById(id);
  }
}
