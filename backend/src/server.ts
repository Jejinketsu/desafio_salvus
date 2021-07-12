if(process.env.NODE_ENV !== 'production')
    require('dotenv').config();

import "reflect-metadata";
import "./database/connection";

import express from 'express';
import routes from "./routes";

const app = express();

app.use(express.json());
app.use(routes);

app.listen(3333, () => console.log('Server listening...'));