import express from 'express';
import { AppDataSource } from './data-source';
import { User } from './entity/user';

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');

    async function setData() {
      await AppDataSource.getRepository(User).insert({
        firstName: 'Vasiliy',
        lastName: 'Romanov',
        age: 29,
        id: crypto.randomUUID(),
      });
      app.get('/users', async (req, res) => {
        const users = await AppDataSource.getRepository(User).find();
        res.json(users);
      });
    }
    setData();
  })
  .catch((err) => {
    console.error('Error during Data Source initialization:', err);
  });

app.get('/', (req, res) => {
  res.send('Express + TypeORM + PostgreSQL');
});

app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});
