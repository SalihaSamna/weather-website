const express = require('express')
const path = require('path')
const hbs = require('hbs')
const app = express()
const port = process.env.PORT || 1000
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast')

const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
app.set('view engine', 'ejs')
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Trucking Weather App',
        name: 'Saliha Samna'
    })
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About App',
        name: 'Saliha Samna'
    })
})
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Contact Us',
        name: ' Saliha Samna',
        helptext: 'Contact for any issue at salihasamna@gmail.com for more information'
    })
})
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({ error: 'please provide address in query string' })
    }
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })

})
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404 page',
        errorMessage: 'Help text not found',
        name: 'Saliha Samna'
    })
})
app.get('*', (req, res) => {
    res.render('404', {
        title: '404 Error',
        name: 'Saliha Samna',
        errorMessage: 'Page not found'
    })
})

app.listen(port, () => {
    console.log("server is up and running in " + port)
})