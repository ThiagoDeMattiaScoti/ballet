import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import usuarioRouter from './routes/usuario.routes';
import escolaRouter from './routes/escola.routes';

const server = express();

server.use(cors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
    credentials: true,
    exposedHeaders: ['x-user-data'],
}));

server.listen(3333, () => {
    console.log('Server is running on port 3333');
});

server.use(express.json())
server.use(usuarioRouter)
server.use(escolaRouter)