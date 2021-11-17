
const path = require('path')
const express = require('express')
const hbs = require('hbs')
const { title } = require('process')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup Handlebars engine, views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Ye Weather App',
        pageTitle: 'Weather: Index',
        forecast: 'Sunny',
        name: 'Brent'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Ye Weather App',
        aboutText: 'One of those days.',
        name: 'Brent'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        helpText: 'Please, help yourself!',
        name: 'Brent'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address.'
        })
    }

    const address = req.query.address
    console.log('Searching for address: ' + address)
    
    geocode(address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }
    
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }
    
            console.log(address)
            console.log(forecastData)

            res.send({
                address: address,
                location: location,
                pageTitle: 'Weather Forecast',
                forecast: forecastData,
                name: 'Brent'
            })
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('not_found', {
        pageTitle: '404: not found',
        notFoundText: 'Help article not found',
        name: 'Brent'
    })
})

app.get('*', (req, res) => {
    res.render('not_found', {
        pageTitle: '404: Not found',
        notFoundText: 'page not found',
        name: 'Brent'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port + '.')
})
