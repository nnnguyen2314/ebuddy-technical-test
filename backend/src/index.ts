import express, { Express, Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import apiRoutes from './routes/api';

dotenv.config();
const port = process.env.PORT || 3002;

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(apiRoutes.authRoute);
app.use(apiRoutes.videoRoute);

app.listen(port, () => console.log(`Listening on port ${port}`));

module.exports = app;
