const express = require('express')
const path = require('path')
const hbs = require('hbs')
const app = express()
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')
const port = process.env.PORT || 3000

//console.log(path.join(__dirname, '../public'))
const pathTohtml = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
app.use(express.static(pathTohtml))
app.set('view engine', 'hbs')
app.set('views', viewsPath);
hbs.registerPartials(partialsPath)

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Created by saliha samna'
    })
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Created by Saliha Samna'
    })
})
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Contact Us',
        name: ' Created by Saliha Samna',
        helptext: 'Contact saliha samna for more information'
    })
})
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({ Error: 'please provide address in query string' })
    }
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send(error)
        }

        forecast(latitude, longitude, (error, forecastdata) => {
            if (error) {
                return res.send(error)
            }
            res.send({
                forecast: forecastdata,
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
        name: 'Created by Saliha Samna'
    })
})
app.get('*', (req, res) => {
    res.render('404', {
        title: '404 Error',
        name: 'Created by Saliha Samna',
        errorMessage: 'Page not found'
    })
})

app.listen(port, () => {
    console.log("sever is up and running in" + port)
})