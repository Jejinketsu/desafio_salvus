if(process.env.NODE_ENV !== 'production')
    require('dotenv').config();
require('express-async-errors');

import "reflect-metadata";
import "./database/connection";
import ErrorHandler from "./middleware/ErrorHandler";

import express from 'express';
import routes from "./routes";

const app = express();

app.use(express.json());
app.use(routes);
app.use(ErrorHandler);

app.listen(3333, () => console.log('Server listening...'));