import { Module } from '@nestjs/common';
import { RowsService } from './rows.service';
import { RowsController } from './rows.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Row } from './entities/row.entity';
import { NotificationGateway } from '../notifications/notification.gateway';

@Module({
  imports: [TypeOrmModule.forFeature([Row])],
  controllers: [RowsController],
  providers: [RowsService, NotificationGateway],
})
export class RowsModule {}
