const express = require('express');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
})

app.get('/api/quotes/random', (req, res, next) => {
    const random = Math.floor(Math.random() * quotes.length);
    res.send(quotes[random]);
})

app.get('/api/quotes', (req, res, next) => {
    const person = req.query.person;
    if (person) {
        personQuotes = quotes.filter(quote => quote.person === person);
        res.send({quotes: personQuotes});
    } else {
        res.send({quotes: quotes});
    }
})

app.post('/api/quotes', (req, res, next) => {
    const { person, quote } = req.query;
    if (person && quote) {
        newQuote = {
            person, quote
        }
        quotes.push(newQuote);
        res.status(201).send({quote: newQuote});
    } else {
        res.status(400).send();
    }
})