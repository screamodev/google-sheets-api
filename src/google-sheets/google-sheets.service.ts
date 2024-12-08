import { Injectable, Logger } from '@nestjs/common';
import { google, sheets_v4 } from 'googleapis';

@Injectable()
export class GoogleSheetsService {
  private readonly logger = new Logger(GoogleSheetsService.name);
  private sheets: sheets_v4.Sheets;

  constructor() {
    const auth = new google.auth.GoogleAuth({
      keyFile: 'credentials.json',
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    this.sheets = google.sheets({ version: 'v4', auth });
    this.logger.log('Google Sheets API initialized successfully');
  }

  async createSpreadsheet(title: string): Promise<string> {
    const response = await this.sheets.spreadsheets.create({
      requestBody: {
        properties: { title },
      },
    });

    const spreadsheetId = response.data.spreadsheetId;
    this.logger.log(`Spreadsheet created: ${spreadsheetId}`);
    return spreadsheetId;
  }

  async appendRow(spreadsheetId: string, values: any[]): Promise<void> {
    await this.sheets.spreadsheets.values.append({
      spreadsheetId,
      range: 'Sheet1',
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [values],
      },
    });

    this.logger.log(`Row appended to spreadsheet: ${spreadsheetId}`);
  }
}
