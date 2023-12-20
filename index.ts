import express from 'express';
import cors from 'cors';
import { AppDataSource } from './data-source';
import { ApplicationRoutes } from './src/routes/applicationrouter';

AppDataSource.initialize();

const app = express();

const allowedOrigins = ['http://localhost:3000'];

const options: cors.CorsOptions = {
  credentials: true,
  origin: allowedOrigins,
};

app.use(cors(options));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(8080, () => {
  console.log('Server started on port 8080');
});

app.use('/api', new ApplicationRoutes().router);

app.get('/health', (req, res) => {
  res.send('Server health is good');
});
