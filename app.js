const express = require('express')
const morgan = require('morgan')

const app = express();

app.use(morgan('common'));

const apps = require('./playstore')

app.get('/apps', (req, res) => {
    const { sort, genre } =req.query;

    if (sort) {
        if (!['rating', 'app'].includes(sort)) {
            return res
                .status(400)
                .send('Sort must include either rating or app');
        }
    }

    if (sort) {
        results
            .sort((a,b) => {
                return a[sort] > b[sort] ? 1: a[sort] < b[sort] ? -1 : 0;
            });
    }

    if (genre) {
        if(!['Action', 'Puzzle', 'Strategy', 'Casual', 'Arcade', 'Card'].includes(genre)) {
            return res
                .status(400)
                .send('Must be a either Action, Puzzle, Strategy, Causal, Arcade or Card')
        }
    }

    if (genre) {
        results 
            .filter((genre) => {
            return apps.filter(genre)
        });
    }

    let results = apps

    res
        .json(results);
});

app.listen(8000, () => {
    console.log('Server started on Port 8000')
})