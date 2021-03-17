const request = require('request')
const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=443154f94473dd969edac27105cae97b&query=' + latitude + ',' + longitude + '&units=f'

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather app services', undefined)
        } else if (body.error) {
            callback('Unable to find the location', undefined)
        } else {

            callback(undefined, body.current.weather_descriptions + '.It is currently ' + body.current.temperature + ' degrees out,but feels like  ' + body.current.feelslike + ' degrees out. The humidity is ' + body.current.humidity + '%')
        }
    })
}

module.exports = forecast