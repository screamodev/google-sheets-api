import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RowsModule } from './rows/rows.module';
import { GoogleSheetsModule } from './google-sheets/google-sheets.module';
import { NotificationModule } from './notifications/notification.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5433,
      username: 'postgres',
      password: 'postgres',
      database: 'postgres',
      autoLoadEntities: true,
      synchronize: true,
    }),
    GoogleSheetsModule,
    NotificationModule,
    RowsModule,
  ],
})
export class AppModule {}
