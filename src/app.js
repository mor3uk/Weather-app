const geocode = require('./utils/geocode.js');
const forecast = require('./utils/forecast.js');
const path = require('path');
const express = require('express');
const hbs = require('hbs');

const app = express();

// Define paths
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsDirectoryPath = path.join(__dirname, '../templates/views');
const partialsDirectoryPath = path.join(__dirname, '../templates/partials')

// Set handler and views location
app.set('view engine', 'hbs');
app.set('views', viewsDirectoryPath);
hbs.registerPartials(partialsDirectoryPath);

app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
       title: 'Weather',
       author: 'Max Crazy'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
       title: 'About me',
       author: 'Max Crazy'
    });
});

app.get('/Help', (req, res) => {
    res.render('help', {
       helpText: 'You get help if you\'re stuck',
       title: 'Help page',
       author: 'Max Crazy'
    });
});

// Get adress from a user and send the forecast back
app.get('/weather', (req, res) => {
    if (!req.query.adress) {
        return res.send({
            error: 'You must specify the adress!'
        });
    }

    geocode(req.query.adress, (error, { latitude, longtitude, placeName } = {}) => {
        if (error) {
            return res.send({
                error
            });
        }
        
        forecast(latitude, longtitude, (error, forecast) => {
            if (error) {
                return res.send({
                    error
                });
            }

            res.send({
                forecast,
                location: placeName,
                adress: req.query.adress
            });
        });
    });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        author: 'Max Crazy',
        message404: 'Help article not found'
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        author: 'Max Crazy',
        message404: 'Page not found'
    });
});

app.listen(3000, () => {
    console.log('Server started on port 3000');
});