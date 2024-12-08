import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RowsModule } from './rows/rows.module';
import { GoogleSheetsModule } from './google-sheets/google-sheets.module';
import { NotificationModule } from './notifications/notification.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'boringly-popular-thrasher.data-1.use1.tembo.io',
      port: 5432,
      username: 'postgres',
      password: 'qsFNxZbOMJqy3N6p',
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
