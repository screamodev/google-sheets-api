import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'boringly-popular-thrasher.data-1.use1.tembo.io',
  port: 5432,
  username: 'postgres',
  password: 'qsFNxZbOMJqy3N6p',
  database: 'postgres',
  ssl: {
    rejectUnauthorized: false,
  },
});

AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization', err);
  });
