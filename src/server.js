import dotenv from 'dotenv';
import express from "express";
import cardRouter from './routes/cards.js';

dotenv.config()

const app = express();
app.use(express.json());

const PORT = process.env.PORT;

app.use('/cards', cardRouter);
app.listen(PORT, () => console.log(`Server is running on ${PORT}`));