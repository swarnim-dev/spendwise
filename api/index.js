const express = require('express');
const cors = require('cors');
const Transaction = require('./models/Transaction');
const mongoose = require('mongoose');
const app = express();
require('dotenv').config();

app.use(cors());
app.use(express.json());
app.get('/api/test', (req, res) => {
    res.json('test passed!');
})

app.post('/api/transaction', async (req, res) => {
    await mongoose.connect(process.env.MONGO_URL);
    const { name, description, dateTime, price } = req.body;
    const transaction = await Transaction.create({ name, description, dateTime, price })
    res.json(transaction);
})

app.get('/api/transactions', async (req, res) => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        const transactions = await Transaction.find();
        res.json(transactions);
    } catch (error) {
        console.log(error);
    }
})

app.listen(4000);

