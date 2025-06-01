import express from 'express';
import { AppDataSource } from './data-source.js';
import { User } from './entity/user.js';

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

AppDataSource.initialize()
  .then(() => {
    app.get('/users', async (req, res) => {
      const users = await AppDataSource.getRepository(User).find();
      res.json(users);
    });
  })
  .catch((err: Error) => {
    console.error('Error during Data Source initialization:', err);
  });
