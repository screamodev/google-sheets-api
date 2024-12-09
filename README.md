# Google Sheets Webhook Application

## Overview
This application integrates Google Sheets with a backend service to automate data processing and notifications. It listens for changes in a Google Sheets file, sends the updated data to a backend server, and performs additional operations such as saving data to a database, notifying connected clients via WebSocket, and sending email notifications for specific conditions.

## Purpose
This application is designed to:
- Automate data synchronization between Google Sheets and a backend database.
- Notify users about updates in real-time using WebSocket.
- Send email notifications when certain thresholds are met (e.g., every 10 new rows added).
- Provide RESTful endpoints for querying the data stored in the database.

## Deployed Services
- **API URL**: https://google-sheets-api-rnj8.onrender.com/api

## Technology Stack
- **Backend**: Node.js with NestJS
- **Database**: PostgreSQL
- **Email Service**: SendGrid
- **WebSocket**: Socket.io
- **Google API**: Used for Google Sheets and Drive integrations

## Prerequisites
- **Node.js**: Ensure you have Node.js installed.
- **PostgreSQL**: A running instance of PostgreSQL.
- **Google API Credentials**: A `credentials.json` file for accessing the Google Sheets API.
- **SendGrid API Key**: For sending email notifications.

## Setup Instructions

### 1. Clone the Repository
```bash
git clone <repository-url>
cd <repository-folder>
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Set Up Environment Variables
Create a `.env` file in the root of the project with the following variables:
```
DATABASE_HOST=your-database-host
DATABASE_PORT=your-database-port
DATABASE_USER=your-database-user
DATABASE_PASSWORD=your-database-password
DATABASE_NAME=your-database-name

SENDGRID_EMAIL_SENDER=your-email@example.com
SENDGRID_API_KEY=your-sendgrid-api-key
```

### 4. Configure Google API
Place your `credentials.json` file in the root directory of the project. This file is required to authenticate with Google Sheets API. You can generate this file from the [Google Cloud Console](https://console.cloud.google.com/).

### 5. Start the Application
Run the following command to start the application:
```bash
npm run start
```

### 6. Run in Development Mode (Optional)
For development mode with hot-reloading:
```bash
npm run start:dev
```

### 7. Run Migrations (if using TypeORM)
```bash
npm run typeorm migration:run
```

## API Endpoints

### POST `/rows/webhook`
- **Description**: Handles incoming webhook requests from Google Sheets.
- **Request Body**:
  ```json
  {
    "sheetName": "Sheet1",
    "range": "A1:C10",
    "values": [["Row1Col1", "Row1Col2"], ["Row2Col1", "Row2Col2"]],
    "users": ["user1@example.com", "user2@example.com"]
  }
  ```

### GET `/rows`
- **Description**: Fetches all rows from the database.

### GET `/rows/:id`
- **Description**: Fetches a specific row by its ID.

## Notes
- Ensure that your PostgreSQL instance is accessible and properly configured in the `.env` file.
- The `credentials.json` file must match the Google Cloud project associated with the Google Sheets file.
- The application requires a valid SendGrid API key for sending email notifications.

## Additional Resources
- [NestJS Documentation](https://docs.nestjs.com/)
- [SendGrid API Documentation](https://docs.sendgrid.com/)
- [Google Sheets API Documentation](https://developers.google.com/sheets/api/)

