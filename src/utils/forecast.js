const request = require('postman-request')

// weatherstack.com API key: f55f085e70f0e5b4f16e29d506abe052
// http://api.weatherstack.com/

const forecast = (latitude, longitude, callback) => {
    var url = 'http://api.weatherstack.com/current?access_key=f55f085e70f0e5b4f16e29d506abe052&query='
    url = url + latitude + ',' + longitude //+ '&units=c'
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Error connecting to weather service!', undefined)
        } else if (body.error) {
            callback('unable to find location: ' + body.error.info, undefined)
        } else {
            const { temperature, feelslike, humidity, weather_icons } = body.current
            callback(undefined, "It is currently " + temperature + " degrees, and feels like " + feelslike + " degrees, with " + humidity + "% humidity.")
        }
    })
}

module.exports = forecast
