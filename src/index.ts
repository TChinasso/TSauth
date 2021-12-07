import express from 'express';

import './database/connect.ts'
import routes from './routes';
import 'reflect-metadata';

const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);


app.listen(3330, () => {console.log('servidor rodando')});