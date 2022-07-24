import express from "express";
import picodb from "picodb";

import { validateCardData } from "../validator/reqValidator.js";

const cardRouter = express.Router();
const cardsDb = picodb();

cardRouter.post('/add', async (req, res) => {

    const cardObj = req.body;

    const validationResult = validateCardData(cardObj);

    if(validationResult.length) {
        res.status(400).send(validationResult);

    } else {

        const { name, cardNumber, limit} = req.body;
        const doc = await cardsDb.insertOne({ name, cardNumber, limit});
        res.status(201).send({ doc });
    }
})

cardRouter.get('/getAll', async (req, res) => {

    const allCards = await cardsDb.find({}).toArray();
    res.send({ allCards });
})

export default cardRouter;